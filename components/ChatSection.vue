<template>
  <v-navigation-drawer
    v-model="drawer"
    width="420"
    class="chat-section"
    app
    left
    clipped
  >
    <template #prepend>
      <!-- Mobile View -->
      <div class="d-block d-sm-none text-center">
        <v-btn
          color="gradient--color"
          class="rounded-0"
          depressed
          block
          small
          dark
          @click="toggleChatSection"
        >
          Close
        </v-btn>
      </div>
    </template>
    <v-sheet
      v-if="messages.length === 0"
      color="white"
      height="100%"
      class="d-flex flex-column align-center justify-center text-center pa-4"
    >
      <v-icon color="black" size="80">$svg-chat</v-icon>
      <h3 class="black--text text-uppercase mt-3">It's empty in here</h3>
      <p class="ma-0 black--text text-body-2">
        Start chatting with others in your room
      </p>
    </v-sheet>
    <v-card
      v-else
      v-chat-scroll
      color="white"
      height="100%"
      class="overflow-y-auto pa-sm-2"
      flat
    >
      <v-scroll-y-reverse-transition group>
        <template v-for="item in messages">
          <ChatItem
			v-if="item.user"
            :key="item._id"
            :current="item.user.socketId === $socket.id"
            :data="item"
          />
        </template>
      </v-scroll-y-reverse-transition>
      <v-scroll-y-reverse-transition>
        <TypingDots v-if="showDots" :user="user" />
      </v-scroll-y-reverse-transition>
    </v-card>
    <template #append>
      <v-divider />
      <SendMessage />
      <v-divider />
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      showDots: false,
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.chatSection
      },
      set(value) {
        return value
      },
    },
    messages() {
      return this.$store.state.messages.list
    },
  },
  beforeCreate() {
    this.$socket.on('TYPING_STATUS', (status, user) => {
      this.showDots = status
      this.user = user
    })
  },
  methods: {
    toggleChatSection() {
      this.$store.commit('TOGGLE_CHAT_SECTION')
    },
  },
}
</script>
