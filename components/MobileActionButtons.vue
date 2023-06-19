<template>
  <v-fade-transition>
    <div v-if="files.length > 0" class="d-flex justify-end mt-16 mb-4">
      <v-menu :nudge-width="200" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="gradient--color"
            class="text-capitalize"
            rounded
            depressed
            dark
            v-bind="attrs"
            v-on="on"
          >
            Actions
            <v-icon size="28">$svg-drop-down</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <div v-if="receiver">
              <div v-if="zeroProgress">
                <v-list-item link @click="acceptAll()">
                  <v-list-item-content>
                    <v-list-item-title class="black--text">
                      Accept All
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <ConfirmationDialog type="REJECT_ALL">
                  <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title class="black--text">
                        Reject All
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </ConfirmationDialog>
              </div>
              <ConfirmationDialog v-if="progress" type="CANCEL_ALL">
                <v-list-item link>
                  <v-list-item-content>
                    <v-list-item-title class="black--text">
                      Cancel All
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </ConfirmationDialog>
            </div>
            <ConfirmationDialog v-if="sender" type="REMOVE_ALL">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="black--text">
                    Clear All
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </ConfirmationDialog>
            <ConfirmationDialog v-if="download" type="DISMISS_ALL">
              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="black--text">
                    Dismiss All
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </ConfirmationDialog>
          </v-list>
        </v-card>
      </v-menu>
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
