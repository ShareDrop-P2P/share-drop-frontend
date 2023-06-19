<template>
  <v-card id="socialMediaSection" flat outlined rounded="lg" class="pa-7">
    <h3 class="mb-7">Social Media</h3>
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
        v-model="facebookLink"
        color="black"
        :rules="[rules.required]"
        label="Facebook Link"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="twitterLink"
        color="black"
        :rules="[rules.required]"
        label="Twitter Link"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="youtubeLink"
        color="black"
        :rules="[rules.required]"
        label="Instagram Link"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="instagramLink"
        color="black"
        :rules="[rules.required]"
        label="Pinterest Link"
        outlined
        rounded
        @keypress="alart.text = null"
      />
      <v-text-field
        v-model="pinterestLink"
        color="black"
        :rules="[rules.required]"
        label="Youtube Link"
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
      facebookLink: null,
      twitterLink: null,
      youtubeLink: null,
      instagramLink: null,
      pinterestLink: null,
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
      if (data.facebookLink) {
        this.facebookLink = data.facebookLink
      } else {
        this.facebookLink = process.env.FACEBOOK_LINK
      }

      if (data.twitterLink) {
        this.twitterLink = data.twitterLink
      } else {
        this.twitterLink = process.env.TWITTER_LINK
      }

      if (data.youtubeLink) {
        this.youtubeLink = data.youtubeLink
      } else {
        this.youtubeLink = process.env.YOUTUBE_LINK
      }

      if (data.instagramLink) {
        this.instagramLink = data.instagramLink
      } else {
        this.instagramLink = process.env.INSTAGRAM_LINK
      }

      if (data.pinterestLink) {
        this.pinterestLink = data.pinterestLink
      } else {
        this.pinterestLink = process.env.PINTEREST_LINK
      }
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.loading = true

        try {
          const res = await this.$axios.$put('/api/settings/update', {
            facebookLink: this.facebookLink,
            twitterLink: this.twitterLink,
            youtubeLink: this.youtubeLink,
            instagramLink: this.instagramLink,
            pinterestLink: this.pinterestLink,
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
