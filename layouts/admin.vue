<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  head() {
    return {
      titleTemplate: `%s - ${this.defaultData.appName}`,
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
}
</script>
