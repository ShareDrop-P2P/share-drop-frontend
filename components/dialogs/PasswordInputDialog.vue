<template>
  <v-dialog v-model="dialog" max-width="450" :overlay-opacity="0.8" persistent>
    <v-card color="white" rounded="lg">
      <div class="pa-4 pa-sm-7">
        <h3 class="text-body-1 text-sm-h6 font-weight-regular mb-7 ml-1">
          The room is protected by password
        </h3>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="password"
            :rules="[rules.required]"
            :append-icon="passwordShow ? 'svg-eye-open' : 'svg-eye-close'"
            :type="passwordShow ? 'text' : 'password'"
            color="black"
            background-color="gray-light"
            label="Password"
            class="text-field-icon--black"
            filled
            rounded
            :error-messages="errorMessage"
            @click:append="passwordShow = !passwordShow"
            @keypress="errorMessage = null"
          />
          <div class="text-center ma-4 ma-sm-7 mb-0 mb-sm-0">
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
              Submit
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      peerId: null,
      password: '',
      passwordShow: false,
      loading: false,
      errorMessage: null,
      rules: {
        required: (v) => !!v || `Password field can't be empty!`,
      },
    }
  },
  beforeCreate() {
    this.$peer.on('open', (peerId) => {
      this.peerId = peerId
    })

    this.$socket.on('ROOM_PASSWORD_RESPONSE', (res) => {
      if (res.type === 'passwordRequired') {
        this.dialog = true
      }
    })
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        const roomId = this.$route.params.id

        if (this.peerId && roomId) {
          this.$socket.emit(
            'CHECK_ROOM_PASSWORD',
            roomId,
            this.peerId,
            this.password,
            (res) => {
              if (res.type === 'success') {
                this.dialog = false
                this.loading = false
              } else {
                this.errorMessage = res.message
                this.loading = false
              }
            }
          )
        }
      }
    },
  },
}
</script>
