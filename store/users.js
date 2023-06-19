export const state = () => ({
    current: null,
    list: [],
    response: null,
    roomExistError: false
})
    
export const mutations = {
    SET_CURRENT_USER(state, data) {
        state.current = data
    },
    SET_ACTIVE_USERS(state, users) {
        state.list = users
    },
    STREAM_USERS(state, user) {
        if (user.type === 'added') {
            // Add user
            state.list.push(user.data)
            // Set notification
            this.commit('notifications/SET_NOTIFICATION', { type: 'JOIN', data: user.data })
        } else {
            const idx = state.list.findIndex((obj => obj._id === user.data._id))

            // Update user data
            if (user.type === 'updated' && idx > -1) {
                state.list[idx] = user.data
                state.list = JSON.parse(JSON.stringify(state.list))
            }

            // Remove user
            if (user.type === 'removed' && idx > -1) {
                state.list.splice(idx, 1)
                // Set notification
                this.commit('notifications/SET_NOTIFICATION', { 
                    type: 'LEAVE', data: user.data
                })
            }
        }
    },
    UPDATE_USER(state, data) {
        // Emit for update user data
        this.$socket.emit('UPDATE_USER', data)
        // For init response
        this.dispatch('users/setResponse')
    },
    SET_RESPONSE(state, response) {
        state.response = response
    },
    SET_ROOM_EXIST_ERROR(state, status) {
        state.roomExistError = status
    }
}
  
export const actions = {
    initUser({ commit }, roomId) {
        // Join user with peer ID
        this.$peer.on('open', (peerId) => {
            this.$socket.emit('JOIN_ROOM', roomId, peerId)
        })

        this.$peer.on('error', (err) => { 
            if (err) this.$peer.reconnect()
        })
    },
    setCurrentUser({ commit }) {
        // Init current user data
        this.$socket.on('CURRENT_USER', (data) => {
            commit('SET_CURRENT_USER', data)
        })
    },
    getActiveUsers({ commit }) {
        // Init all active users
        this.$socket.on('ACTIVE_USERS', (users) => {
            commit('SET_ACTIVE_USERS', users)
        })
    },
    streamUsers({ commit }) {
        // Stream users behavior
        this.$socket.on('STREAM_USERS', (user) => {
            commit('STREAM_USERS', user)
        })
    },
    joinRoom({ commit }, data) {
        // Join new room after room Id changed
        const { oldRoomId, newRoomId } = data
        this.$socket.emit('REJOIN_ROOM', oldRoomId, newRoomId)
    },
    setResponse({ commit }) {
        // Set response messages from server
        this.$socket.on('USER_UPDATE_RESPONSE', (response) => {
            commit('SET_RESPONSE', response)
        })
    }
}