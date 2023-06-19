<template>
  <div>
    <ChatSection />
    <CurrentUser />
    <ActiveUserList />
    <FileList />
    <ConnectSection />
    <MobileNotificationSection />
    <PasswordInputDialog />
    <!-- Loading -->
    <v-bottom-sheet v-model="loading" persistent>
      <v-sheet
        class="align-center justify-center d-flex"
        color="gradient--color"
        height="68px"
      >
        <v-progress-circular
          indeterminate
          color="icon--white"
          size="25"
          width="3"
        />
        <h3
          class="text-capitalize text-body-1 text-sm-h6 text--white ml-3 font-weight-medium text-uppercase"
        >
          Connecting
        </h3>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'RoomPage',
  layout: 'main',
  computed: {
    currentUser() {
      return this.$store.state.users.current
    },
    loading() {
      return !this.currentUser
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.beforeWindowUnload)

    // For mobile only
    this.$nextTick(() => {
      if (window.innerWidth < 600) {
        this.$store.commit('TOGGLE_CHAT_SECTION')
        this.$store.commit('TOGGLE_CONNECT_SECTION')
      }
    })
  },
  beforeCreate() {
    this.$store.dispatch('init', this.$route.params.id)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.beforeWindowUnload)

    // Reset users & Remove all socket listeners
    this.$socket.removeAllListeners()
    this.$socket.on('ACTIVE_USERS', (users) => {
      this.$store.commit('users/SET_ACTIVE_USERS', users)
    })
  },
  methods: {
    beforeWindowUnload(e) {
      e.preventDefault()
      e.returnValue = ''
    },
  },
}
</script>
