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
      <div class="d-block d-sm-none text-center">
        <v-btn
          color="gradient--color"
          class="rounded-0"
          depressed
          block
          small
          dark
          @click="toggleNotificationSection"
        >
          Close
        </v-btn>
      </div>
    </template>
    <v-sheet
      v-if="notifications.length === 0"
      color="white"
      height="100%"
      class="d-flex flex-column align-center justify-center pa-4"
    >
      <v-icon color="black" size="80">$svg-bell</v-icon>
      <h3 class="black--text text-uppercase mt-3">It's empty in here</h3>
      <p class="ma-0 black--text text-body-2">
        There is no notification right now
      </p>
    </v-sheet>
    <v-card
      v-else
      color="white"
      height="100%"
      class="overflow-y-auto pa-2 pl-4"
      flat
    >
      <v-scroll-y-reverse-transition group>
        <div v-for="(item, i) in notifications" :key="i">
          <NotificationItem :data="item" />
        </div>
      </v-scroll-y-reverse-transition>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.notificationSection
      },
      set(value) {
        return value
      },
    },
    notifications() {
      return this.$store.state.notifications.list
    },
  },
  methods: {
    toggleNotificationSection() {
      this.$store.commit('TOGGLE_NOTIFICATION_SECTION')
    },
  },
}
</script>
