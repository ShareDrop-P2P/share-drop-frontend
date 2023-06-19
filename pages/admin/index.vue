<template>
  <v-sheet
    color="gray-light"
    class="d-flex align-center justify-center pa-7"
    height="100vh"
  >
    <v-card flat width="450px" class="pa-7" rounded="xl" outlined>
      <h1 class="text-center text-h5 mb-7">Admin Login</h1>
      <v-alert
        v-if="errorMessage"
        outlined
        color="error"
        rounded="lg"
        class="mb-8"
      >
        {{ errorMessage }}
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
          @keypress="errorMessage = null"
        />
        <v-text-field
          v-model="password"
          color="black"
          type="password"
          :rules="[rules.required]"
          label="Password"
          outlined
          rounded
          @keypress="errorMessage = null"
        />
        <v-btn
          type="submit"
          color="gradient--color"
          class="text-capitalize"
          block
          depressed
          x-large
          dark
          rounded
          :loading="loading"
        >
          Submit
        </v-btn>
      </v-form>
      <div class="mt-7 text-center">
        <nuxt-link to="/" class="text-uppercase">Back to home</nuxt-link>
      </div>
    </v-card>
  </v-sheet>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  layout: 'admin',
  middleware({ redirect }) {
    // Middleware for user are authenticated or not
    const authenticated = Cookies.get('authenticated')
    if (authenticated) redirect('/admin/dashboard')
  },
  data() {
    return {
      valid: true,
      loading: false,
      email: '',
      password: '',
      errorMessage: null,
      rules: {
        required: (v) => !!v || 'This field must be required',
        email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      },
    }
  },
  head() {
    return {
      title: 'Admin Login',
    }
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        try {
          const res = await this.$axios.$post('/api/admin/login', {
            email: this.email,
            password: this.password,
          })

          if (res) {
            this.loading = false
            this.$router.push('/admin/dashboard')
            // If login successful set a Cookie
            Cookies.set('authenticated', res.token)
          }
        } catch (err) {
          this.errorMessage = err.response.data.message
          this.loading = false
        }
      }
    },
  },
}
</script>
