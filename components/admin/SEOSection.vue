<template>
  <v-card id="seoSection" flat outlined rounded="lg" class="pa-7">
    <h3 class="mb-7">SEO Settings</h3>
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
        v-model="metaDescription"
        color="black"
        label="Meta Description"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="appKeywords"
        color="black"
        label="Keywords"
        hint="Split words into single commas ','"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="ogTitle"
        color="black"
        label="OG Title"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="ogURL"
        color="black"
        label="OG URL"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="ogDescription"
        color="black"
        label="OG Description"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="ogImage"
        color="black"
        label="OG Image"
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
      metaDescription: null,
      appKeywords: null,
      ogTitle: null,
      ogURL: null,
      ogDescription: null,
      ogImage: null,
      alart: {
        type: null,
        text: null,
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
      if (data.metaDescription) {
        this.metaDescription = data.metaDescription
      }

      if (data.appKeywords) {
        this.appKeywords = data.appKeywords
      }

      if (data.ogTitle) {
        this.ogTitle = data.ogTitle
      }

      if (data.ogURL) {
        this.ogURL = data.ogURL
      }

      if (data.ogDescription) {
        this.ogDescription = data.ogDescription
      }

      if (data.ogImage) {
        this.ogImage = data.ogImage
      }
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        try {
          const res = await this.$axios.$put('/api/settings/update', {
            metaDescription: this.metaDescription,
            appKeywords: this.appKeywords,
            ogTitle: this.ogTitle,
            ogURL: this.ogURL,
            ogDescription: this.ogDescription,
            ogImage: this.ogImage,
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
