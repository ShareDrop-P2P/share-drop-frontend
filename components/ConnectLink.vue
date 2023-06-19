<template>
  <div class="d-flex flex-column align-center">
    <div v-if="roomId" class="my-8">
      <v-sheet color="black" class="pa-2" rounded="lg">
        <!-- Dark Mode -->
        <div v-if="darkTheme">
          <QrCode :text="roomURL" :size="200" color="#191B2A" bg-color="#fff" />
        </div>
        <!-- Light Mode -->
        <QrCode
          v-else
          :text="roomURL"
          :size="200"
          color="#fff"
          bg-color="#191B2A"
        />
      </v-sheet>
    </div>
    <v-sheet v-else width="200" height="200" class="my-8" rounded="lg">
      <v-skeleton-loader type="image" />
    </v-sheet>
    <div class="connect-link w-100 d-flex align-center justify-space-between">
      <v-sheet color="gray-light" rounded="xl" class="w-100 py-2 px-4 mr-3">
        <input
          v-if="roomId"
          ref="roomURL"
          type="text"
          class="w-100"
          :value="roomURL"
          readonly
        />
        <v-skeleton-loader v-else type="list-item-one-line" />
      </v-sheet>
      <v-btn color="gradient--color" small fab depressed @click="copyRoomURL()">
        <v-icon size="20" color="icon--white">$svg-copy</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark
    },
    roomId() {
      const currentUser = this.$store.state.users.current
      return currentUser ? currentUser.roomId : null
    },
    roomURL() {
      return `${window.location.origin}/${this.roomId}`
    },
  },
  methods: {
    copyRoomURL() {
      const URL = this.$refs.roomURL
      URL.select()
      URL.setSelectionRange(0, 99999)

      navigator.clipboard.writeText(URL.value)
    },
  },
}
</script>

<style lang="sass" scoped>
.connect-link
  input
    color: var(--v-black-base)
    font-size: 15px
    font-weight: 500
    outline: none
</style>
