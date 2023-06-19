<template>
  <v-card id="imagesSection" flat outlined rounded="lg" class="pa-7">
    <h3 class="mb-7">Image Settings</h3>
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
      <v-row>
        <v-col cols="12" sm="4">
          <label for="darkLogo">
            <v-card class="pa-7" outlined>
              <p>Dark Logo</p>
              <v-img
                :src="darkLogoPreview"
                :lazy-src="darkLogoPreview"
                alt="Dark Logo"
                width="200px"
              />
            </v-card>
          </label>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="whiteLogo">
            <v-card class="pa-7" color="black" outlined>
              <p class="white--text">White Logo</p>
              <v-img
                :src="whiteLogoPreview"
                :lazy-src="whiteLogoPreview"
                alt="White Logo"
                width="200px"
              />
            </v-card>
          </label>
        </v-col>
        <v-col cols="12" sm="4">
          <label for="favicon">
            <v-card class="pa-7" outlined>
              <p>Favicon</p>
              <v-img
                :src="faviconPreview"
                :lazy-src="faviconPreview"
                alt="Favicon"
                width="50px"
              />
            </v-card>
          </label>
        </v-col>
      </v-row>
      <div class="my-8" />
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
    <input
      id="darkLogo"
      type="file"
      accept="image/*"
      style="display: none"
      @change="changeDarkLogo"
    />
    <input
      id="whiteLogo"
      type="file"
      accept="image/*"
      style="display: none"
      @change="changeWhiteLogo"
    />
    <input
      id="favicon"
      type="file"
      accept="image/*"
      style="display: none"
      @change="changeFavicon"
    />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      darkLogoPreview: '/dark-logo.png',
      whiteLogoPreview: '/white-logo.png',
      faviconPreview: '/favicon.ico',
      darkLogo: null,
      whiteLogo: null,
      favicon: null,
      alart: {
        type: null,
        text: null,
      },
    }
  },
  methods: {
    changeDarkLogo(e) {
      const file = e.target.files[0]
      this.darkLogoPreview = URL.createObjectURL(file)
      this.darkLogo = file
    },
    changeWhiteLogo(e) {
      const file = e.target.files[0]
      this.whiteLogoPreview = URL.createObjectURL(file)
      this.whiteLogo = file
    },
    changeFavicon(e) {
      const file = e.target.files[0]
      this.faviconPreview = URL.createObjectURL(file)
      this.favicon = file
    },
    async submit() {
      if (this.darkLogo || this.whiteLogo || this.favicon) {
        this.loading = true

        try {
          const formData = new FormData()
          formData.append('darkLogo', this.darkLogo)
          formData.append('whiteLogo', this.whiteLogo)
          formData.append('favicon', this.favicon)

          const res = await this.$axios.$put('/api/settings/update', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
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
