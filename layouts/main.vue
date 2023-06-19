<template>
  <v-app dark>
    <AppBar />
    <v-main>
      <v-sheet color="gray-light" min-height="100vh">
        <Nuxt />
      </v-sheet>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
  head() {
    return {
      titleTemplate: `%s - ${this.defaultData.appSlogan}`,
      title: this.defaultData.appName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.defaultData.metaDescription,
        },
        { name: 'keywords', content: this.defaultData.appKeywords },
        {
          name: 'title',
          property: 'og:title',
          content: this.defaultData.ogTitle,
        },
        {
          name: 'image',
          property: 'og:image',
          content: this.defaultData.ogImage,
        },
        { name: 'url', property: 'og:url', content: this.defaultData.ogURL },
        {
          name: 'description',
          property: 'og:description',
          content: this.defaultData.ogDescription,
        },
      ],
    }
  },
  computed: {
    defaultData() {
      return this.$store.state.defaultData
    },
  },
  async beforeCreate() {
    try {
      const res = await this.$axios.get('/api/settings')
      this.$store.commit('SET_DEFAULT_DATA', res.data.data)
    } catch (_) {}
  },
}
</script>
