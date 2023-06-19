<template>
  <div class="pa-4 pa-sm-6 pb-3">
    <v-card rounded="lg" class="pa-4" outlined>
      <div v-if="currentUser" class="d-sm-flex">
        <div class="d-flex align-center mb-2 mb-sm-0">
          <!-- Desktop View -->
          <div class="d-none d-sm-block">
            <UserAvatar
              :name="currentUser.name"
              :image="currentUser.avatar"
              :size="60"
            />
          </div>
          <!-- Mobile View -->
          <div class="d-block d-sm-none">
            <UserAvatar
              :name="currentUser.name"
              :image="currentUser.avatar"
              :size="45"
            />
          </div>
          <div class="ml-3">
            <h4
              class="black--text text-subtitle-1 font-weight-bold d-flex align-center"
              v-text="currentUser.name"
            />
            <p class="d-none d-sm-block black--text text-body-2 ma-0">
              This is your tile. Beneath you'll see other tiles just like this
              one. Drag and drop your files or click on them to initiate a file
              transfer.
            </p>
          </div>
        </div>
        <p class="d-block d-sm-none black--text text-caption ma-0">
          This is your tile. Beneath you'll see other tiles just like this one.
          Drag and drop your files or click on them to initiate a file transfer.
        </p>
      </div>
      <!-- Loading -->
      <v-skeleton-loader v-else type="list-item-avatar-three-line" />
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.users.current
    },
  },
}
</script>
