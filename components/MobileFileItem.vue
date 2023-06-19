<template>
  <div class="mb-4 mb-sm-6">
    <v-card class="bg--white pa-4" rounded="lg" outlined>
      <v-avatar
        rounded="lg"
        width="100%"
        height="150"
        color="gradient--color justify-center"
      >
        <!-- Image -->
        <v-img
          v-if="file.type === 'image'"
          :src="file.image"
          :lazy-src="file.image"
          :alt="file.name"
          class="pa-3"
        >
          <v-avatar color="gradient--color" size="30">
            <v-icon v-if="file.progress === 100" color="white" size="22">
              $svg-check
            </v-icon>
            <v-icon v-else color="white" size="24">
              $svg-chevron-double-{{
                file.sender.socketId === $socket.id ? 'up' : 'down'
              }}
            </v-icon>
          </v-avatar>
        </v-img>
        <!-- Other Files -->
        <div v-else>
          <v-avatar color="white" class="action-type" size="30">
            <v-icon v-if="file.progress === 100" color="black" size="22">
              $svg-check
            </v-icon>
            <v-icon v-else color="black" size="24">
              $svg-chevron-double-{{
                file.sender.socketId === $socket.id ? 'up' : 'down'
              }}
            </v-icon>
          </v-avatar>
          <v-icon v-if="file.type === 'video'" size="50" color="white">
            $svg-video
          </v-icon>
          <v-icon v-if="file.type === 'audio'" size="50" color="white">
            $svg-music
          </v-icon>
          <v-icon v-if="file.type === 'unknown'" size="50" color="white">
            $svg-blank-file
          </v-icon>
        </div>
      </v-avatar>
      <h3 class="text-body-2 font-weight-medium black--text pa-0 mb-2 mt-3">
        {{ file.name }}
      </h3>
      <p class="text-body-2 text--secondary mb-3">
        {{ file.size | prettyBytes(1) }}
        <v-icon color="black">$svg-dot</v-icon>
        {{ file.progress }}%
      </p>
      <v-progress-linear :value="file.progress" color="#26C884" height="3" />
      <!-- Action Buttons -->
      <v-card-actions class="pa-0 mt-4">
        <div class="d-flex mx-auto">
          <div v-if="file.receiver.socketId === $socket.id">
            <v-btn
              v-if="file.progress === 100"
              color="gradient--color"
              fab
              small
              depressed
              @click="downloadFile(file.id)"
            >
              <v-icon color="white">$svg-file-download</v-icon>
            </v-btn>
            <v-btn
              v-if="file.progress < 1"
              color="gradient--color"
              fab
              small
              depressed
              @click="acceptFile(file)"
            >
              <v-icon color="white">$svg-check</v-icon>
            </v-btn>
          </div>
          <div class="mx-1" />
          <ConfirmationDialog :data="file" type="REMOVE_ONE">
            <v-btn color="gradient--color" fab small depressed>
              <v-icon color="white">$svg-close</v-icon>
            </v-btn>
          </ConfirmationDialog>
        </div>
      </v-card-actions>
    </v-card>
    <a :id="file.id" href="#" style="display: none" />
  </div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    acceptFile(data) {
      this.$store.commit('files/ACCEPT_FILE', data)
    },
    downloadFile(id) {
      const downloadAnchor = document.getElementById(id)
      downloadAnchor.click()
    },
  },
}
</script>

<style lang="sass" scoped>
.action-type
  position: absolute
  top: 14px
  left: 14px
</style>
