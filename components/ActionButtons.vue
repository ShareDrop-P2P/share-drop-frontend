<template>
  <v-fade-transition>
    <div v-if="files.length > 0" class="d-flex justify-end mt-16 mb-4 mb-sm-6">
      <div v-if="receiver" class="d-flex">
        <div v-if="zeroProgress" class="d-flex">
          <v-btn
            color="gradient--color"
            class="text-capitalize"
            rounded
            depressed
            dark
            @click="acceptAll()"
          >
            Accept All
          </v-btn>
          <ConfirmationDialog type="REJECT_ALL">
            <v-btn
              color="gradient--color"
              class="text-capitalize mx-3"
              rounded
              depressed
              dark
            >
              Reject All
            </v-btn>
          </ConfirmationDialog>
        </div>
        <ConfirmationDialog v-if="progress" type="CANCEL_ALL">
          <v-btn
            color="gradient--color"
            class="text-capitalize mr-3"
            rounded
            depressed
            dark
          >
            Cancel All
          </v-btn>
        </ConfirmationDialog>
      </div>
      <ConfirmationDialog v-if="sender" type="REMOVE_ALL">
        <v-btn
          color="gradient--color"
          class="te text-capitalize mr-3"
          rounded
          depressed
          dark
        >
          Clear All
        </v-btn>
      </ConfirmationDialog>
      <ConfirmationDialog v-if="download" type="DISMISS_ALL">
        <v-btn
          color="gradient--color"
          class="te text-capitalize"
          rounded
          depressed
          dark
        >
          Dismiss All
        </v-btn>
      </ConfirmationDialog>
    </div>
  </v-fade-transition>
</template>

<script>
export default {
  computed: {
    files() {
      return this.$store.state.files.previews
    },
    // Check current user sends files to other peers or not if sends then show the button
    sender() {
      const found = this.files.find((obj) => {
        const { sender } = obj
        return sender.socketId === this.$socket.id
      })

      return !!found
    },
    // Check current user receive any files or not if receives then show the button
    receiver() {
      const found = this.files.find((obj) => {
        const { receiver } = obj
        return receiver.socketId === this.$socket.id
      })

      return !!found
    },
    // If all files download successfully then show the button
    download() {
      const found = this.files.find((obj) => obj.progress === 100)
      return !!found
    },
    // If no files are downloaded then show the button
    zeroProgress() {
      const found = this.files.find((obj) => obj.progress === 0)
      return !!found
    },
    // If any file download started and not download yet any files then show the button
    progress() {
      const found = this.files.find(
        (obj) => obj.progress > 0 && obj.progress < 100
      )
      return !!found
    },
  },
  methods: {
    // Accept all files one by one
    acceptAll() {
      this.files.forEach((item) => {
        this.$store.commit('files/ACCEPT_FILE', item)
      })
    },
  },
}
</script>
