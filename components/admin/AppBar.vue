<template>
  <v-app-bar
    flat
    color="gradient--color"
    class="px-md-9 px-lg-16"
    dark
    app
    fixed
  >
    <div class="px-lg-3" />
    <h3 class="mr-md-8 text-body-1 font-weight-bold">Admin Dashboard</h3>
    <div class="d-none d-md-flex">
      <v-btn
        class="text-capitalize"
        rounded
        text
        @click="$vuetify.goTo('#generalSection')"
        >General</v-btn
      >
      <v-btn
        class="text-capitalize"
        rounded
        text
        @click="$vuetify.goTo('#seoSection')"
        >SEO</v-btn
      >
      <div class="d-none d-lg-flex">
        <v-btn
          class="text-capitalize"
          rounded
          text
          @click="$vuetify.goTo('#imagesSection')"
          >Images</v-btn
        >
        <v-btn
          class="text-capitalize"
          rounded
          text
          @click="$vuetify.goTo('#socialMediaSection')"
          >Social Media</v-btn
        >
        <v-btn
          class="text-capitalize"
          rounded
          text
          @click="$vuetify.goTo('#AccountSection')"
          >Account</v-btn
        >
      </div>
      <v-menu :nudge-width="200" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            class="text-capitalize d-none d-md-flex d-lg-none"
            rounded
            text
            v-bind="attrs"
            v-on="on"
            >More</v-btn
          >
        </template>
        <v-card>
          <v-list>
            <v-list-item link @click="$vuetify.goTo('#imagesSection')">
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  >Images</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$vuetify.goTo('#socialMediaSection')">
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  >Social Media</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item link @click="$vuetify.goTo('#AccountSection')">
              <v-list-item-content>
                <v-list-item-title class="black--text"
                  >Account</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
    <v-spacer />
    <v-btn
      class="text-capitalize d-none d-md-block"
      rounded
      text
      @click="logout()"
      >Logout</v-btn
    >
    <v-menu :nudge-width="200" offset-y>
      <template #activator="{ on, attrs }">
        <v-btn class="d-block d-md-none mr-n3" v-bind="attrs" icon v-on="on">
          <v-icon>$svg-menu</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item link @click="$vuetify.goTo('#generalSection')">
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >General Section</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$vuetify.goTo('#seoSection')">
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >SEO Section</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$vuetify.goTo('#imagesSection')">
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Image Section</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$vuetify.goTo('#socialMediaSection')">
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Social Media Section</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="$vuetify.goTo('#AccountSection')">
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Account Section</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="logout()">
            <v-list-item-content>
              <v-list-item-title class="black--text">Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <div class="px-lg-1" />
  </v-app-bar>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  methods: {
    async logout() {
      try {
        await this.$axios.$get('/api/admin/logout')
        Cookies.remove('authenticated')
        this.$router.push('/admin')
      } catch (_) {}
    },
  },
}
</script>
