export const state = () => ({
    list: [],
})
    
export const mutations = {
    SET_MESSAGES(state, messages) {
        state.list = messages
    },
    STREAM_MESSAGES(state, message) {
        state.list.push(message)
        // Set notification
        this.commit('notifications/SET_NOTIFICATION', { type: 'MESSAGE', data: message.user })
    }
}
  
export const actions = {
    getMessages({ commit }, roomId) {
        // Get all messages when page load
        this.$socket.emit('MESSAGES', roomId, (messages) => {
            commit('SET_MESSAGES', messages)
        })
    },
    streamMessages({ commit }) {
        // Stream messages to all connected users
        this.$socket.on('STREAM_MESSAGES', (message) => {
            commit('STREAM_MESSAGES', message)
        })
    },
    sendMessage({ commit }, message) {
        // Send message
        this.$socket.emit('SEND_MESSAGE', message)
        // Hide typing dots
        this.$socket.emit('TYPING', false)
    },
    typing({ commit }, status) {
        this.$socket.emit('TYPING', status)
    }
}