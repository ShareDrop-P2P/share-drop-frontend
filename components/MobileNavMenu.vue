<template>
  <v-menu :nudge-width="200" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn
        color="black"
        class="d-block d-sm-none"
        v-bind="attrs"
        icon
        v-on="on"
      >
        <v-icon>$svg-menu</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-item link @click="toggleTheme()">
          <v-list-item-icon class="mr-4">
            <v-icon color="black">$svg-{{ darkTheme ? 'moon' : 'sun' }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text">
              {{ darkTheme ? 'Light Mode' : 'Dark Mode' }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toggleConnectSection">
          <v-list-item-icon class="mr-4">
            <v-icon color="black" size="28">$svg-add-user</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text">Add User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="toggleChatSection">
          <v-list-item-icon class="mr-4">
            <v-icon color="black">$svg-chat</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="black--text">Messages</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip
              class="text-body-2 font-weight-medium"
              color="gradient--color"
              text-color="icon--white"
            >
              {{ unseenMessages }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <JoinRoomDialog>
          <v-list-item>
            <v-list-item-icon class="mr-4">
              <v-icon color="black">$svg-grid-add</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Join Room</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </JoinRoomDialog>
        <SettingsDialog>
          <v-list-item>
            <v-list-item-icon class="mr-4">
              <v-icon color="black">$svg-setting</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Settings</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </SettingsDialog>
        <InfoDialog>
          <!-- we can pur connect button here for mobile-->

          <v-list-item>
            <v-list-item-icon class="mr-4">
              <v-icon color="black">$svg-info</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="black--text"
                >Information</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </InfoDialog>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    unseenMessages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    darkTheme() {
      return this.$vuetify.theme.dark
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('useDarkTheme', this.$vuetify.theme.dark.toString())
    },
    toggleChatSection() {
      this.$store.commit('TOGGLE_CHAT_SECTION')
    },
    toggleConnectSection() {
      this.$store.commit('TOGGLE_CONNECT_SECTION')
    },
  },
}
</script>
