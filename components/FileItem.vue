<template>
  <div class="mb-6">
    <v-card class="bg--white px-4 py-2" rounded="lg" outlined>
      <v-list-item class="pa-0">
        <v-list-item-avatar
          rounded="lg"
          size="90"
          color="gradient--color justify-center"
        >
          <!-- Image -->
          <v-img
            v-if="file.type === 'image'"
            :src="file.image"
            :lazy-src="file.image"
            :alt="file.name"
            class="pa-1"
          >
            <v-avatar color="gradient--color" size="28">
              <v-icon v-if="file.progress === 100" color="white" size="22">
                $svg-check
              </v-icon>
              <v-icon v-else color="white" size="22">
                $svg-chevron-double-{{
                  file.sender.socketId === $socket.id ? 'up' : 'down'
                }}
              </v-icon>
            </v-avatar>
          </v-img>
          <!-- Other Files -->
          <div v-else>
            <v-avatar color="white" class="action-type" size="28">
              <v-icon v-if="file.progress === 100" color="black" size="22">
                $svg-check
              </v-icon>
              <v-icon v-else color="black" size="22">
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
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-body-1 font-weight-medium">
            {{ file.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ file.size | prettyBytes(1) }}
            <v-icon color="black">$svg-dot</v-icon>
            {{ file.progress }}%
          </v-list-item-subtitle>
          <v-progress-linear
            :value="file.progress"
            color="#26C884"
            class="mt-2"
            height="3"
          />
        </v-list-item-content>
        <!-- Action Buttons -->
        <v-list-item-action>
          <div class="d-flex">
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
        </v-list-item-action>
      </v-list-item>
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
  top: 4px
  left: 4px
</style>
