import { Peer } from 'peerjs';
import Vue from 'vue';

// ICE server configuration
const configuration = {
  config: {
    'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
      { 
        url: 'turn:openrelay.metered.ca:80', 
        username: 'openrelayproject', 
        credential: 'openrelayproject' 
      }
    ]
  }
}

export default ({ app }, inject) => {
  inject('peer', Vue.observable(new Peer(configuration)))
}