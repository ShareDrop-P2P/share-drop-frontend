<template>
  <v-sheet color="gray-light">
    <AdminAppBar />
    <v-container>
      <div class="my-md-6" />
      <AdminGeneralSection />
      <div class="my-3 my-md-7" />
      <AdminSEOSection />
      <div class="my-3 my-md-7" />
      <AdminImagesSection />
      <div class="my-3 my-md-7" />
      <AdminSocialMediaSection />
      <div class="my-3 my-md-7" />
      <AdminAccountSection />
      <div class="my-md-7" />
    </v-container>
  </v-sheet>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  layout: 'admin',
  middleware({ redirect }) {
    // Middleware for user are authenticated or not
    const authenticated = Cookies.get('authenticated')
    if (!authenticated) redirect('/admin')
  },
  head() {
    return {
      title: 'Admin Dashboard',
    }
  },
  async beforeCreate() {
    try {
      const res = await this.$axios.get('/api/settings')
      this.$store.commit('SET_DEFAULT_DATA', res.data.data)
    } catch (_) {}
  },
}
</script>
