<template>
  <v-list-item class="pa-0 mb-2">
    <!-- Desktop View -->
    <div class="d-none d-sm-block mr-4">
      <UserAvatar :name="data.name" :image="data.avatar" :size="60" />
    </div>
    <!-- Mobile View -->
    <div class="d-block d-sm-none mr-4">
      <UserAvatar :name="data.name" :image="data.avatar" :size="45" />
    </div>
    <v-list-item-content>
      <v-list-item-title class="text-body-1 font-weight-medium">
        {{ data.name }}
      </v-list-item-title>
      <p class="text-body-2 text--secondary">
        {{ message(data.type) }}
      </p>
      <p class="text-caption ma-0 font-weight-medium" v-text="time" />
    </v-list-item-content>
    <v-list-item-action>
      <ConfirmationDialog type="REMOVE_NOTIFICATION" :data="{ id: data.id }">
        <v-btn
          color="gradient--color"
          class="d-none d-sm-block"
          fab
          small
          depressed
        >
          <v-icon color="icon--white" size="22">$svg-trash</v-icon>
        </v-btn>
        <v-btn color="black" class="d-block d-sm-none" icon>
          <v-icon size="22">$svg-trash</v-icon>
        </v-btn>
      </ConfirmationDialog>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      time: moment(this.data.time).fromNow(),
    }
  },
  created() {
    setInterval(() => {
      this.time = moment(this.data.time).fromNow()
    }, 1000)
  },
  methods: {
    message(type) {
      switch (type) {
        case 'JOIN':
          return 'Join the room'

        case 'LEAVE':
          return 'Leave the room'

        case 'MESSAGE':
          return 'Send a message'

        case 'FILE_ADDED':
          return 'Added a file'

        case 'FILE_REMOVED':
          return 'Removed a file'

        case 'REJECT_ALL':
          return 'Rejected all files'

        case 'ACCEPT_FILE':
          return 'Accepted the file'

        case 'CLEAR_ALL':
          return 'Canceled all files'
      }
    },
  },
}
</script>
