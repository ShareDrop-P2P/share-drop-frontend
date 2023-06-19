// Receive file handler class

class Receive {
    constructor(peer, socket) {
        this.peer = peer // Peer instance
        this.socket = socket // Socket instance
        this.receiveBuffer = {} // Store file chunks
    }

    // Convert chunks to file and download file
    download(id) {
        const { size: fileSize, chunks, receivedSize, name } = this.receiveBuffer[id]

        if (fileSize === receivedSize) {
            // Chunks array to Blob
            const received = new Blob(chunks)
            const downloadAnchor = document.getElementById(id)
            // Remove all receiving chunks
            delete this.receiveBuffer[id]
            // Set download anchor
            downloadAnchor.href = URL.createObjectURL(received) || '#'
            downloadAnchor.download = name
            // Download without click
            downloadAnchor.click()
        }
    }

    // Send file progress to socket when every file chunk receive
    progress(fileId, chunkSize) {
        const { size } = this.receiveBuffer[fileId]
        this.socket.emit('FILE_PROGRESS', fileId, chunkSize, size)
    }

    // Stream files
    files() {
        this.peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                // Set object ID to identify the file
                if (data.type === 'meta' || data.type === 'chunk') {
                    const { id } = data
                    if (!this.receiveBuffer[id]) {
                        this.receiveBuffer[id] = { chunks: [], receivedSize: 0 }
                    }
                }

                // Init file info
                if (data.type === 'meta') {
                    const { id, name, size } = data
                    this.receiveBuffer[id].name = name
                    this.receiveBuffer[id].size = size
                }

                // Receive file chunk
                if (data.type === 'chunk') {
                    const { id, chunk, count } = data
                    const file = this.receiveBuffer[id]

                    file.chunks[count] = chunk
                    file.receivedSize += chunk.byteLength

                    this.progress(id, file.receivedSize)
                    this.download(id)
                }
            })
        })
    }

    // Delete all file chunks
    clear(id) {
        if (this.receiveBuffer[id]) delete this.receiveBuffer[id]
    }
}

export default ({ app }, inject) => {
    inject('receive', () => new Receive(app.$peer, app.$socket))
}