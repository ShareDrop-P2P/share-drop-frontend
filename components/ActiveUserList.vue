<template>
  <div class="px-4 px-sm-6">
    <v-card
      v-if="users.length <= 1"
      class="pa-4 pa-sm-10 text-center d-block mt-1 mb-4 mb-sm-6"
      color="gradient--color"
      rounded="lg"
      flat
      dark
    >
      <v-icon class="d-none d-sm-block mx-auto" size="60">$svg-coffee</v-icon>
      <v-icon class="d-block d-sm-none mx-auto" size="45">$svg-coffee</v-icon>
      <p class="d-none d-sm-block ma-0 text-body-2 mt-2">
        Nobody is connected to your network.
      </p>
      <p class="d-none d-sm-block ma-0 text-body-2">
        Open this website elsewhere to connect.
      </p>
      <p class="d-block d-sm-none mt-2 ma-0 text-caption">
        Nobody is connected to your network. Open this website elsewhere to
        connect.
      </p>
    </v-card>
    <div v-else class="mt-1">
      <v-row>
        <template v-for="user in users">
          <v-col
            v-if="user.socketId !== $socket.id"
            :key="user._id"
            cols="12"
            sm="4"
          >
            <ActiveUser :user="user" />
          </v-col>
        </template>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.users.list
    },
  },
}
</script>
