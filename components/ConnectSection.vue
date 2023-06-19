<template>
  <v-navigation-drawer
    v-model="drawer"
    color="white"
    width="420"
    class="connect-section"
    app
    right
    clipped
  >
    <template #prepend>
      <!-- Mobile View -->
      <div class="d-block d-sm-none text-center">
        <v-btn
          color="gradient--color"
          class="rounded-0"
          depressed
          block
          small
          dark
          @click="toggleConnectSection"
        >
          Close
        </v-btn>
      </div>
    </template>
    <div class="pa-4 pa-sm-6">
      <h3 class="black--text text-h6 text-sm-h5 font-weight-bold mb-2 mt-n1">
        Share files between devices in different networks
      </h3>
      <p class="black--text text-body-2 ma-0">
        Copy provided address and send it to the other person or you can scan it
        on the other devices.
      </p>
      <ConnectLink />
      <div class="mt-4">
        <p class="black--text text-body-2 mb-4">
          Share the link with other persons via social media or messenger
          applications.
        </p>
        <div class="mx-n1">
          <ShareNetwork
            network="facebook"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              rounded
              small
              depressed
            >
              <v-icon color="icon--white" size="21" left>$svg-facebook</v-icon>
              Facebook
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" size="18" left>$svg-twitter</v-icon>
              Twitter
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="linkedin"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" left>$svg-linkedin</v-icon>
              LinkedIn
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="reddit"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" left>$svg-reddit</v-icon>
              Reddit
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="email"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" left>$svg-email</v-icon>
              Email
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="sms"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" left>$svg-sms</v-icon>
              SMS
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="skype"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" left>$svg-skype</v-icon>
              Skype
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="messenger"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" size="22" left>$svg-messenger</v-icon>
              Messenger
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="whatsapp"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" size="18" left>$svg-whatsapp</v-icon>
              Whatsapp
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="telegram"
            :url="roomURL"
            title="This is flash Share connection establish link. Go to the link for receiving files"
            class="text-decoration-none"
          >
            <v-btn
              color="gradient--color"
              class="ma-1 text-capitalize text--white"
              small
              rounded
              depressed
            >
              <v-icon color="icon--white" size="19" left>$svg-telegram</v-icon>
              Telegram
            </v-btn>
          </ShareNetwork>
        </div>
      </div>
    </div>
    <template #append>
      <v-divider />
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.connectSection
      },
      set(value) {
        return value
      },
    },
    roomId() {
      const currentUser = this.$store.state.users.current
      return currentUser ? currentUser.roomId : null
    },
    roomURL() {
      return `${window.location.origin}/${this.roomId}`
    },
  },
  methods: {
    toggleConnectSection() {
      this.$store.commit('TOGGLE_CONNECT_SECTION')
    },
  },
}
</script>
