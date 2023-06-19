<template>
  <v-card id="AccountSection" flat outlined rounded="lg" class="pa-7">
    <h3 class="mb-7">Account Settings</h3>
    <v-alert
      v-if="alart.text"
      outlined
      :color="alart.type"
      rounded="lg"
      class="mb-8"
    >
      {{ alart.text }}
    </v-alert>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit()"
    >
      <v-text-field
        v-model="email"
        color="black"
        :rules="[rules.required, rules.email]"
        label="Email"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="currentPassword"
        type="password"
        color="black"
        label="Old Password"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="newPassword"
        color="black"
        type="password"
        label="New Password"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="confirmPassword"
        :rules="[rules.passwordMatch]"
        color="black"
        type="password"
        label="Confirm Password"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-btn
        type="submit"
        color="gradient--color"
        class="text-capitalize px-16 d-none d-sm-block"
        depressed
        x-large
        dark
        rounded
        :loading="loading"
      >
        Save Chnages
      </v-btn>
      <v-btn
        type="submit"
        color="gradient--color"
        class="text-capitalize px-16 d-block d-sm-none"
        depressed
        x-large
        dark
        rounded
        block
        :loading="loading"
      >
        Save Chnages
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      email: null,
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      alart: {
        type: null,
        text: null,
      },
      rules: {
        required: (v) => !!v || 'This field must be required',
        email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        passwordMatch: (v) =>
          this.newPassword === v || 'The password is not match',
      },
    }
  },
  async created() {
    try {
      const res = await this.$axios.get('/api/admin/get-email')
      this.email = res.data.email
    } catch (_) {}
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        try {
          let res

          if (this.email) {
            res = await this.$axios.$put('/api/admin/update-email', {
              email: this.email,
            })
          } else {
            res = await this.$axios.$put('/api/admin/update-password', {
              currentPassword: this.currentPassword,
              newPassword: this.newPassword,
            })
          }

          if (res) {
            this.alart.type = 'success'
            this.alart.text = 'Data updated successfully'
            this.loading = false
          }
        } catch (err) {
          this.alart.type = 'error'
          this.alart.text = err.response.data.message
          this.loading = false
        }
      }
    },
  },
}
</script>
