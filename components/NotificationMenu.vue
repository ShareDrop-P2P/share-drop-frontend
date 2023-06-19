<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="black"
        class="d-none d-sm-block"
        v-bind="attrs"
        icon
        v-on="on"
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
    </template>
    <v-card
      class="bg--white px-6 pt-4 pb-2 overflow-y-auto"
      rounded="lg"
      width="420"
      height="500"
    >
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
      <div v-else>
        <v-scroll-y-reverse-transition group>
          <div v-for="(item, i) in notifications" :key="i">
            <NotificationItem :data="item" />
          </div>
        </v-scroll-y-reverse-transition>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      count: 0,
      total: 0,
    }
  },
  computed: {
    notifications() {
      return this.$store.state.notifications.list
    },
  },
  watch: {
    // Seen all notifications when the popup open
    menu(val) {
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
    // Number format
    kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'K'
        : Math.sign(num) * Math.abs(num)
    },
  },
}
</script>
