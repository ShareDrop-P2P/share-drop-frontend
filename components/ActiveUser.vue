<template>
  <div class="active-user">
    <label :for="user.socketId">
      <v-card
        class="cursor--pointer text-center d-flex align-center justify-center flex-column pa-4"
        rounded="lg"
        height="100%"
        outlined
        @dragover="dragover"
        @drop="drop"
      >
        <div v-if="user.roomOwner" class="room-owner">
          <v-icon color="black" size="22">$svg-star</v-icon>
        </div>
        <ActiveUserAvatar :user-name="user.name" :user-avatar="user.avatar" />
        <p
          class="ma-0 text-body-2 black--text font-weight-medium text-truncate"
          v-text="user.name"
        />
      </v-card>
    </label>
    <input
      :id="user.socketId"
      ref="fileUpload"
      type="file"
      hidden
      multiple
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Init all files
    onChange() {
      const { socketId, peerId } = this.user
      const files = this.$refs.fileUpload.files

      this.$store.commit('files/INIT_FILES', { socketId, peerId, files })
    },
    dragover(e) {
      e.preventDefault()
    },
    drop(e) {
      e.preventDefault()
      this.$refs.fileUpload.files = e.dataTransfer.files
      this.onChange()
    },
  },
}
</script>

<style lang="sass" scoped>
.room-owner
  position: absolute
  top: 6px
  right: 6px
</style>
