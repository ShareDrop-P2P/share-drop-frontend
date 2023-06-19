import crypto from 'crypto'

export const state = () => ({
    list: [],
    previews: []
})

export const mutations = {
    INIT_FILES(state, data) {
        this.dispatch('files/setFilesData', data)
    },
    SET_FILE(state, file) {
        state.list.push(file)
    },
    SET_PREVIEW(state, data) {
        state.previews.push(data)

        const { sender, receiver: { peerId } } = data
        // Send file preview to remote peer
        this.$preview(peerId).send({ type: 'PREVIEW_ADD', data })
        // Set notification
        this.dispatch('notifications/setNotification', { 
            type: 'FILE_ADDED', peerId: sender.peerId 
        })
    },
    REMOVE_ONE(state, id) {
        const idx = state.previews.findIndex((obj => obj.id === id))

        if (idx > -1) {
            state.list.splice(idx, 1)
            state.previews.splice(idx, 1)
        }
    },
    REMOVE(state, data) {
        const { sender, receiver, id } = data
        // If current user is a sender then send to receiver otherwise send to sender
        const peerId = this.$socket.id === sender.socketId ? receiver.peerId : sender.peerId
        // Establish peer connection
        const conn = this.$peer.connect(peerId)

        // Remove file by ID
        this.commit('files/REMOVE_ONE', id)
        // Cancel send
        this.$send().cancel()
        // Clear already sended chunks
        this.$receive().clear(id)

        // Send to peer for notify user
        // Sent Notification to remote peer
        conn.on('open', () => { 
            conn.send({ type: 'FILE_REMOVED', socketId: this.$socket.id  }) 
        })

        // Emit for remove file from sender
        this.$socket.emit('REMOVE_ONE', sender.socketId, receiver.socketId, id)
    },
    CLEAR_ALL_RECEIVER(state, socketId) {
        // Clear all previews from receiver
        state.previews = state.previews.filter((obj) => {
            const { sender } = obj
            return sender.socketId !== socketId
        })

        state.previews = state.previews.filter((obj) => {
            const { receiver } = obj
            return receiver.socketId !== socketId
        })
    },
    CLEAR_ALL_SENDER(state, socketId) {
        // Clear all previews from sender
        state.list = state.list.filter((file) => file.sender !== socketId)
        state.list = state.list.filter((file) => file.receiver !== socketId)
    },
    REMOVE_ALL(state) {
        // Emit for remove all files from both sides
        this.$socket.emit('REMOVE_ALL')
    },
    REJECT_ALL(state) {
        state.previews = state.previews.filter((obj) => {
            const { receiver } = obj
            return receiver.socketId !== this.$socket.id
        })

        // Emit for remove all files from sender
        this.$socket.emit('REJECT_ALL')
    },
    DISMISS_ALL(state) {
        state.previews = state.previews.filter((obj) => obj.progress !== 100)
    },
    CANCEL_ALL(state) {
        const files = state.previews
        
        // Cancel and Clear chunks one by one
        files.forEach((item) => {
            this.$send().cancel()
            this.$receive().clear(item.id)
        })

        // Emit for remove all files from both sides
        this.$socket.emit('REMOVE_ALL') 
    },
    ACCEPT_FILE(state, data) {
        const { sender, receiver, id, name } = data
        // Emit for the file sender to start sending file chunks
        this.$socket.emit('ACCEPT_FILE', sender.socketId, receiver.socketId, id, name)
    },
    SEND_FILE(state, data) {
        const { peerId, id } = data
        const fileIdx = state.list.findIndex((obj => obj.id === id))
        const previewIdx = state.previews.findIndex((obj => obj.id === id))
        const file = state.list[fileIdx]
        const preview = state.previews[previewIdx]

        // Check file already start sending or not
        if (preview && preview.progress === 0) this.$send(peerId, file).files()
    },
    SET_PROGRESS_PERCENTAGE(state, data) {
        // Set file progress percentage by ID
        const { id, chunkSize, fileSize } = data
        const idx = state.previews.findIndex((obj => obj.id === id))

        if (idx > -1) {
            const percentage = Math.floor((chunkSize/fileSize) * 100)
            state.previews[idx].progress = percentage
            
            // If the file sent then splice the file from the sender
            if (percentage === 100) state.list.splice(idx, 1)
        }
    }
}
  
export const actions = {
    setFilesData({ commit, state, rootState }, data) {
        const { socketId, peerId, files } = data

        const setData = (file, base64) => {
            // Generate random file ID
            file.id = crypto.randomBytes(4).toString('hex')
            file.sender = this.$socket.id
            file.receiver = socketId

            // File preview
            const preview = {
                id: file.id,
                sender: {
                    socketId: this.$socket.id,
                    peerId: rootState.users.current.peerId
                },
                receiver: { socketId, peerId },
                name: file.name,
                size: file.size,
                progress: 0
            }
    
            switch (true) {
                case file.type.startsWith('image'):
                    preview.type = 'image'
                    preview.image = base64
                    break
                
                case file.type.startsWith('video'):
                    preview.type = 'video'
                    break
                
                case file.type.startsWith('audio'):
                    preview.type = 'audio'
                    break
            
                default:
                    preview.type = 'unknown'
                    break
            }

            commit('SET_FILE', file)
            commit('SET_PREVIEW', preview)
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i]

            if (file.type.startsWith('image')) {
                // Convert file to base64 string
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => { setData(file, reader.result) }
            } else {
                setData(file)
            }
        }
    },
    streamFilesData({ commit, state }) {
        // Stream all previews & files
        this.$preview().stream()
        this.$receive().files()

        // Set file progress
        this.$socket.on('FILE_PROGRESS', (id, chunkSize, fileSize) => {
            commit('SET_PROGRESS_PERCENTAGE', { id, chunkSize, fileSize })
        })

        // Remove file from remote
        this.$socket.on('REMOVE_ONE', (id) => {
            commit('REMOVE_ONE', id)
        })

        // Clear previews from receiver
        this.$socket.on('REJECT_ALL', (socketId) => {
            commit('CLEAR_ALL_RECEIVER', socketId)
            // Set notification
            this.dispatch('notifications/setNotification', { type: 'REJECT_ALL', socketId })
        })

        // Send file
        this.$socket.on('ACCEPT_FILE', (peerId, id, name) => {
            commit('SEND_FILE', { peerId, id, name })
            // Set notification
            this.dispatch('notifications/setNotification', { type: 'ACCEPT_FILE', peerId })
        })

        // Clear previews & files from both side
        this.$socket.on('CLEAR_ALL', (socketId) => {
            commit('CLEAR_ALL_SENDER', socketId)
            commit('CLEAR_ALL_RECEIVER', socketId)

            if (state.previews.length > 0) {
                // Set notification
                this.dispatch('notifications/setNotification', { type: 'CLEAR_ALL', socketId })
            }
        })
    }
}