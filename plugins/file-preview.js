// File preview handler class

class Preview {
    constructor(peer, store, peerId) {
        this.peer = peer // Peer instance
        this.store = store // Store instance
        this.connection = peer.connect(peerId, { reliable: true }) // Establish WebRTC connection
    }

    // Send preview to remote peer
    send(data) {
        this.connection.on('open', () => {
            this.connection.send(data)
        })
    }

    // Stream previews
    stream() {
        this.peer.on('connection', (conn) => {
            conn.on('data', (item) => {
                if (item.type === 'PREVIEW_ADD') {
                    this.store.commit('files/SET_PREVIEW', item.data)
                }
            })
        })
    }
}

export default ({ app, store }, inject) => {
    inject('preview', (peerId) => new Preview(app.$peer, store, peerId))
}