import crypto from 'crypto'

export const state = () => ({
    list: []
})

export const mutations = {
    SET_NOTIFICATION(state, data) {
        const { type, data: { avatar, name, socketId }} = data
        // Check notification sender is current user
        // If current user do not send the notification
        if (socketId !== this.$socket.id) {
            // Generate random string for notification ID
            const id = crypto.randomBytes(4).toString('hex')
            state.list.push({ type, id, avatar, name, socketId, time: Date.now() })
        }
    },
    REMOVE_NOTIFICATION(state, id) {
        const idx = state.list.findIndex((obj => obj.id === id))
        if (idx > -1) state.list.splice(idx, 1)
    }
}

export const actions = {
    setNotification({ commit, rootState }, data) {
        const { type, socketId, peerId } = data
        const id = socketId || peerId
        const users = rootState.users.list
        
        // Find user
        const user = users.find((obj => obj.socketId === id || obj.peerId === id))
        commit('SET_NOTIFICATION', { type, data: user })
    },
    streamNotifications({ commit }) {
        // Set file remove notification
        this.$peer.on('connection', (conn) => {
            conn.on('data', (item) => {
                if (item.type === 'FILE_REMOVED') {
                    this.dispatch('notifications/setNotification', { 
                        type: item.type, socketId: item.socketId 
                    })
                }
            })
        })
    }
}