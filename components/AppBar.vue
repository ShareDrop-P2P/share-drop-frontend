<template>
  <v-app-bar
    class="app-bar bg--white px-sm-2"
    outlined
    flat
    fixed
    clipped-left
    clipped-right
    app
  >
    <!-- Desktop View -->
    <v-btn
      class="d-none d-sm-block"
      color="black"
      icon
      @click="toggleChatSection"
    >
      <v-badge
        v-if="!chatSection && unseenMessages > 0"
        color="gradient--color"
        :content="unseenMessages"
        overlap
      >
        <v-icon>$svg-menu</v-icon>
      </v-badge>
      <v-icon v-else>$svg-menu</v-icon>
    </v-btn>
    <MobileNavMenu :unseen-messages="unseenMessages" />
    <!-- Mobile View -->
    <v-spacer class="d-block d-sm-none" />
    <nuxt-link :to="`/${roomId}`" class="text-decoration-none">
      <!-- Desktop View -->
      <v-img
        :src="`/${darkTheme ? 'white' : 'dark'}-logo.png`"
        :lazy-src="`/${darkTheme ? 'white' : 'dark'}-logo.png`"
        alt="Logo"
        max-width="170"
        class="d-none d-sm-block"
      />
      <!-- Mobile View -->
      <v-img
        :src="`/${darkTheme ? 'white' : 'dark'}-logo.png`"
        :lazy-src="`/${darkTheme ? 'white' : 'dark'}-logo.png`"
        alt="Logo"
        max-width="140"
        class="d-block d-sm-none"
      />
    </nuxt-link>
    <v-spacer />
    <v-btn color="black" class="d-none d-sm-block" icon @click="toggleTheme()">
      <v-icon>$svg-{{ darkTheme ? 'moon' : 'sun' }}</v-icon>
    </v-btn>
    <!-- Desktop View -->
    <NotificationMenu />
    <!-- Mobile View -->
    <v-btn
      color="black"
      class="d-block d-sm-none"
      icon
      @click="toggleNotificationSection"
    >
      <v-badge
        v-if="total > 0"
        color="gradient--color"
        :content="total"
        overlap
      >
        <v-icon>$svg-bell</v-icon>
      </v-badge>
      <v-icon v-else>$svg-bell</v-icon>
    </v-btn>
    <!-- Mobile View -->
    <v-btn
      color="black"
      class="d-none d-sm-block d-lg-none"
      icon
      @click="toggleConnectSection"
    >
      <v-icon color="black" size="28">$svg-add-user</v-icon>
    </v-btn>
    <!-- Desktop View -->
    <JoinRoomDialog>
      <v-btn color="black" class="d-none d-sm-block" icon>
        <v-icon size="27">$svg-grid-add</v-icon>
      </v-btn>
    </JoinRoomDialog>
    <SettingsDialog>
      <v-btn color="black" class="d-none d-sm-block" icon>
        <v-icon size="25">$svg-setting</v-icon>
      </v-btn>
    </SettingsDialog>
    <InfoDialog>
      <v-btn color="black" class="d-none d-sm-block mr-n1" icon>
        <v-icon size="26">$svg-info</v-icon>
      </v-btn>
    </InfoDialog>
    <!-- we can pur connect button here -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      unseenMessages: 0,
      count: 0,
      total: 0,
    }
  },
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark
    },
    roomId() {
      const currentUser = this.$store.state.users.current
      return currentUser ? currentUser.roomId : null
    },
    chatSection: {
      get() {
        return this.$store.state.chatSection
      },
      set(value) {
        return value
      },
    },
    // All messages
    messages() {
      return this.$store.state.messages.list
    },
    notificationSection() {
      return this.$store.state.notificationSection
    },
    // All notification list
    notifications() {
      return this.$store.state.notifications.list
    },
  },
  watch: {
    messages(list) {
      this.unseenMessages = this.kFormatter(list.length)
    },
    // Seen all notifications when the popup open
    notificationSection(val) {
      if (val === true) {
        this.count = 0
        this.total = 0
      }
    },
    // Count new notifications
    notifications() {
      this.count++
      this.total = this.kFormatter(this.count)
    },
  },
  methods: {
    // Chnage theme
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    },
    toggleChatSection() {
      this.$store.commit('TOGGLE_CHAT_SECTION')
    },
    toggleConnectSection() {
      this.$store.commit('TOGGLE_CONNECT_SECTION')
    },
    toggleNotificationSection() {
      this.$store.commit('TOGGLE_NOTIFICATION_SECTION')
    },
    // Number format
    kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
        : Math.sign(num) * Math.abs(num)
    },
  },
}
</script>
