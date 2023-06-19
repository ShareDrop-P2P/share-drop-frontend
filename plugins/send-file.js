import toBuffer from 'typedarray-to-buffer'

class Send {
    constructor(peer, peerId, file) {
        this.peer = peer // Peer instance
        this.file = file
        this.connection = peer.connect(peerId) // Establish WebRTC connection
        this.fileReader = new FileReader()
        this.chunkSize = 256000 // Default chunk size
    }

    // Send file info to the remote peer 
    sendMetadata() {
        this.connection.on('open', () => {
            const data = { 
                type: 'meta',
                id: this.file.id,
                name: this.file.name,
                size: this.file.size
            }
        
            this.connection.send(data)
        })
    }
    
    // Send file chunks to the remote peer
    files() {
        let offset = 0
        let count = 0

        this.sendMetadata()
        this.connection.on('open', () => {
            this.fileReader.addEventListener('load', (e) => {
                let chunk = e.target.result

                // Convert ArrayBuffer to Uint8Array
                if (chunk instanceof ArrayBuffer) {
                    chunk = toBuffer(new Uint8Array(e.target.result))
                }

                const data = { type: 'chunk', id: this.file.id, chunk, count }
                this.connection.send(data) // Send Chunk

                count++
                offset += e.target.result.byteLength

                if (offset < this.file.size) readSlice(offset)
            })

            // Slice file into chunks
            const readSlice = (o) => {
                const slice = this.file.slice(offset, o + this.chunkSize)
                this.fileReader.readAsArrayBuffer(slice)
            }

            readSlice(0)
        })
    }

    // Cancel sending chunks
    cancel() {
        if (this.fileReader && this.fileReader.readyState === 1) {
            this.fileReader.abort()
        }
    }
}

export default ({ app }, inject) => {
    inject('send', (peerId, file) => new Send(app.$peer, peerId, file))
}