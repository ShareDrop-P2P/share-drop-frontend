<template>
  <v-dialog v-model="dialog" max-width="450" scrollable>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot />
      </div>
    </template>
    <v-card color="white" rounded="lg">
      <v-form
        v-if="currentUser"
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card-text class="pa-4 pa-sm-7 pb-0">
          <div class="text-center mb-7">
            <p v-if="imageSizeError" class="red--text text-caption">
              Image size must be less than 1MB
            </p>
            <div
              style="width: 100px; height: 100px"
              class="mx-auto"
              @click="changeUserAvatar"
            >
              <v-badge
                bordered
                color="black"
                class="cursor--pointer edit-avatar--badge"
                icon="$svg-edit"
                offset-x="26"
                offset-y="26"
                bottom
              >
                <UserAvatar
                  :name="user.name"
                  :image="user.avatar"
                  :size="100"
                />
              </v-badge>
            </div>
          </div>
          <v-text-field
            v-model="user.name"
            :rules="[rules.required, rules.name]"
            label="Name"
            color="black"
            background-color="gray-light"
            :error-messages="nameErrorMessage"
            filled
            rounded
            @keydown="nameErrorMessage = null"
          />
          <div v-if="currentUser.roomOwner">
            <v-text-field
              v-model="user.roomId"
              :rules="[rules.required, rules.roomId]"
              label="Room ID"
              color="black"
              background-color="gray-light"
              append-icon="$svg-reload"
              class="text-field-icon--black"
              :error-messages="roomErrorMessage"
              filled
              rounded
              @click:append="generateRoomId"
              @keydown="roomErrorMessage = null"
            />
            <v-text-field
              v-model="user.password"
              :append-icon="passwordShow ? '$svg-eye-open' : '$svg-eye-close'"
              :type="passwordShow ? 'text' : 'password'"
              color="black"
              background-color="gray-light"
              label="Password"
              class="text-field-icon--black"
              filled
              rounded
              @click:append="passwordShow = !passwordShow"
            />
          </div>
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
            Save Changes
          </v-btn>
        </div>
      </v-form>
      <v-progress-circular v-else :size="50" color="black" indeterminate />
    </v-card>
  </v-dialog>
</template>

<script>
import crypto from 'crypto'

export default {
  data() {
    return {
      dialog: false,
      valid: true,
      loading: false,
      passwordShow: false,
      user: {
        avatar: '',
        name: '',
        roomId: '',
        password: '',
      },
      imageSizeError: false,
      nameErrorMessage: null,
      roomErrorMessage: null,
      rules: {
        required: (v) => !!v || `This field can't be empty!`,
        name: (v) => v.length >= 3 || 'Name minimum 3 characters',
        roomId: (v) => !/\s/g.test(v) || 'Please avoid white space!',
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.users.current
    },
    // Get response from the server
    response() {
      return this.$store.state.users.response
    },
  },
  watch: {
    dialog(val) {
      // Reset validation when dialog close
      if (val === false) {
        this.$refs.form.resetValidation()
        this.imageSizeError = false
      }
    },
    currentUser(user) {
      // Set current user data on change
      this.user.avatar = user.avatar
      this.user.name = user.name
      if (user.roomOwner) this.user.roomId = user.roomId
    },
    response(res) {
      if (res.type === 'error') {
        if (res.errorName === 'name') this.nameErrorMessage = res.message
        if (res.errorName === 'room') this.roomErrorMessage = res.message
      }

      if (res.type === 'success') {
        this.dialog = false
        // Redirect to new room when update room Id
        if (this.currentUser.roomId !== this.$route.params.id) {
          this.$router.push(`/${this.currentUser.roomId}`)
        }
      }

      this.loading = false
    },
  },
  created() {
    // Init current user data
    if (this.currentUser) {
      this.user.avatar = this.currentUser.avatar
      this.user.name = this.currentUser.name
      if (this.currentUser.roomOwner) this.user.roomId = this.currentUser.roomId
    }
  },
  methods: {
    // Convert file to Base64 string
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    async changeUserAvatar() {
      this.loading = true
      // File picker options
      const pickerOpts = {
        types: [
          {
            description: 'Images',
            accept: {
              'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.bmp', '.svg'],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      }

      try {
        // Get file from disk
        const [fileHandle] = await window.showOpenFilePicker(pickerOpts)
        const file = await fileHandle.getFile()

        // File size validation
        if (file.size > 1024 * 1024 * 1) {
          this.imageSizeError = true
          this.loading = false
          return false
        }

        if (file.type.startsWith('image')) {
          this.imageSizeError = false
          this.user.avatar = await this.getBase64(file)
          this.loading = false
        }
      } catch (_) {
        this.imageSizeError = false
        this.loading = false
      }
    },
    generateRoomId() {
      // Generate random room Id
      const roomId = crypto.randomBytes(4).toString('hex')
      this.user.roomId = roomId
    },
    submit() {
      // If all data are valid
      if (this.$refs.form.validate()) {
        this.loading = true
        const data = {}
        const { avatar, name, roomId, password } = this.user

        if (avatar && avatar !== this.currentUser.avatar) data.avatar = avatar
        if (name && name !== this.currentUser.name) data.name = name
        if (roomId && roomId !== this.currentUser.roomId) data.roomId = roomId
        if (password) data.password = password

        this.$store.commit('users/UPDATE_USER', data)
      }
    },
  },
}
</script>
