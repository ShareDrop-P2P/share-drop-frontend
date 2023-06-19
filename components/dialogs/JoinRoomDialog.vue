<template>
  <v-dialog v-model="dialog" max-width="450" scrollable>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot />
      </div>
    </template>
    <v-card color="white" rounded="lg">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card-text class="pa-4 pa-sm-7 pb-0">
          <v-text-field
            v-model="room"
            :rules="[rules.required]"
            label="Room ID or URL"
            color="black"
            background-color="gray-light"
            filled
            rounded
          />
        </v-card-text>
        <div class="text-center ma-4 ma-sm-7">
          <v-btn
            type="submit"
            color="gradient--color"
            class="text-capitalize px-10 px-sm-16"
            :loading="loading"
            depressed
            large
            rounded
            dark
          >
            Join Room
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      loading: false,
      room: '',
      errorMessage: null,
      rules: {
        required: (value) => !!value || `This field can't be empty!`,
      },
    }
  },
  computed: {
    roomExistErr() {
      return this.$store.state.users.roomExistError
    },
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.$refs.form.resetValidation()
        this.loading = false
      }
    },
    roomExistErr(status) {
      if (status) {
        this.errorMessage = 'The room was not found!'
      } else {
        this.dialog = false
      }
    },
  },
  methods: {
    isValidUrl(urlString) {
      const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      ) // validate fragment locator
      return !!urlPattern.test(urlString)
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        // Old room Id before change
        const oldRoomId = this.$route.params.id
        let newRoomId = null

        if (this.isValidUrl(this.room)) {
          // Check URL has HTTP or not
          const room = this.room.startsWith('http')
            ? this.room
            : `http://${this.room}`

          // Convert to valid URL
          const url = new URL(room)
          // Split URL
          const params = url.pathname.split('/')
          // Get & Set new room Id from url
          newRoomId = params[params.length - 1]
        } else {
          newRoomId = this.room
        }

        this.dialog = false
        // Redirect to new room
        this.$router.push(`/${newRoomId}`)
        // Join to new room
        this.$store.dispatch('users/joinRoom', { oldRoomId, newRoomId })
      }
    },
  },
}
</script>
