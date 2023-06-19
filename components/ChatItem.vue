<template>
  <div
    :class="`pa-4 d-flex ${
      current ? 'justify-end align-end' : 'justify-start align-start'
    }`"
  >
    <!-- Remote User -->
    <UserAvatar
      v-if="!current"
      :name="data.user.name"
      :image="data.user.avatar"
      :size="45"
    />
    <div :class="`${current ? 'mr-4' : 'ml-4'}`">
      <!-- Remote User -->
      <div v-if="!current" class="d-flex align-center mb-sm-1">
        <h4
          class="text-body-2 font-weight-medium black--text"
          v-text="data.user.name"
        />
        <v-icon color="black" class="d-none d-sm-block">$svg-dot</v-icon>
        <p
          class="d-none d-sm-block ma-0 text-caption black--text"
          v-text="time"
        />
      </div>
      <!-- Remote User & Mobile -->
      <div v-if="!current" class="d-block d-sm-none d-flex justify-end mb-1">
        <p class="ma-0 text-caption black--text" v-text="time" />
      </div>
      <div :class="`d-flex align-center justify-${current ? 'end' : 'start'}`">
        <v-card
          width="80%"
          :color="current ? 'gradient--color' : 'gray-light'"
          :class="`chat-text-card pa-4 rounded-xl rounded-${
            current ? 'br' : 'tl'
          }-0`"
          flat
        >
          <!-- Dark Mode -->
          <p
            v-if="!darkTheme"
            :class="`ma-0 text-body-2 ${current ? 'white' : 'black'}--text`"
            v-text="data.text"
          />
          <!-- Light Mode -->
          <p
            v-else
            :class="`ma-0 text-body-2 text--white`"
            v-text="data.text"
          />
        </v-card>
      </div>
      <!-- Current User -->
      <div v-if="current" class="d-block d-sm-none d-flex justify-end mt-1">
        <p class="ma-0 text-caption black--text" v-text="time" />
      </div>
      <div v-if="current" class="d-flex align-center justify-end mt-sm-1">
        <p
          class="d-none d-sm-block ma-0 text-caption black--text"
          v-text="time"
        />
        <v-icon color="black" class="d-none d-sm-block">$svg-dot</v-icon>
        <h4
          class="text-body-2 font-weight-medium black--text"
          v-text="data.user.name"
        />
      </div>
    </div>
    <!-- Current User -->
    <UserAvatar
      v-if="current"
      :name="data.user.name"
      :image="data.user.avatar"
      :size="45"
    />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    current: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Time ago using moment package
      time: moment(this.data.createdAt).fromNow(),
    }
  },
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark
    },
  },
  created() {
    // Time changes every 1s
    setInterval(() => {
      this.time = moment(this.data.createdAt).fromNow()
    }, 1000)
  },
}
</script>
