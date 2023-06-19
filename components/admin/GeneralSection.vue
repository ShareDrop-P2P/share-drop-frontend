<template>
  <v-card id="generalSection" flat outlined rounded="lg" class="pa-7">
    <h3 class="mb-7">General Settings</h3>
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
        v-model="appName"
        color="black"
        :rules="[rules.required]"
        label="Application Name"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="appSlogan"
        color="black"
        :rules="[rules.required]"
        label="Application Slogan"
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
      appName: null,
      appSlogan: null,
      alart: {
        type: null,
        text: null,
      },
      rules: {
        required: (v) => !!v || 'This field must be required',
      },
    }
  },
  computed: {
    defaultData() {
      return this.$store.state.defaultData
    },
  },
  watch: {
    defaultData(data) {
      if (data.appName) {
        this.appName = data.appName
      } else {
        this.appName = process.env.APP_NAME
      }

      if (data.appSlogan) {
        this.appSlogan = data.appSlogan
      } else {
        this.appSlogan = process.env.APP_SLOGAN
      }
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        try {
          const res = await this.$axios.$put('/api/settings/update', {
            appName: this.appName,
            appSlogan: this.appSlogan,
          })

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
