import { io } from 'socket.io-client'
import Vue from 'vue'

export default ({ app }, inject) => {
  inject('socket', Vue.observable(io(process.env.EXPRESS_SERVER_URL)))
}