<template>
  <v-footer class="bg--white d-block d-sm-flex align-center px-6" outlined app>
    <p
      class="text-caption text-sm-body-2 d-sm-flex black--text ma-0 text-center text-sm-left mt-2 mt-sm-0"
    >
      <v-icon color="black" size="22">$svg-copyright</v-icon>
      Copyright {{ copyrightYear }}
      <nuxt-link
        to="/"
        class="black--text font-weight-medium text-decoration-none ml-1"
      >
        {{ appName }} </nuxt-link
      ><span class="d-none d-sm-block">. All rights reserved</span>
    </p>
    <v-spacer />
    <div class="text-center text-sm-right">
      <a :href="facebookLink" class="text-decoration-none" target="blank">
        <v-btn color="black" icon>
          <v-icon>$svg-facebook</v-icon>
        </v-btn>
      </a>
      <a :href="twitterLink" class="text-decoration-none" target="blank">
        <v-btn color="black" icon>
          <v-icon size="22">$svg-twitter</v-icon>
        </v-btn>
      </a>
      <a :href="instagramLink" class="text-decoration-none" target="blank">
        <v-btn color="black" icon>
          <v-icon size="26">$svg-instagram</v-icon>
        </v-btn>
      </a>
      <a :href="pinterestLink" class="text-decoration-none" target="blank">
        <v-btn color="black" icon>
          <v-icon size="22">$svg-pinterest</v-icon>
        </v-btn>
      </a>
      <a :href="youtubeLink" class="text-decoration-none" target="blank">
        <v-btn color="black" class="mr-n1" icon>
          <v-icon size="28">$svg-youtube</v-icon>
        </v-btn>
      </a>
    </div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      appName: null,
      copyrightYear: null,
      facebookLink: null,
      twitterLink: null,
      instagramLink: null,
      pinterestLink: null,
      youtubeLink: null,
    }
  },
  computed: {
    defaultData() {
      return this.$store.state.defaultData
    },
  },
  watch: {
    defaultData(data) {
      this.appName = data.appName
      this.copyrightYear = data.copyrightYear
      this.facebookLink = data.facebookLink
      this.twitterLink = data.twitterLink
      this.instagramLink = data.instagramLink
      this.pinterestLink = data.pinterestLink
      this.youtubeLink = data.youtubeLink
    },
  },
}
</script>
