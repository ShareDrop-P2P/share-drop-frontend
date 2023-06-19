<template>
  <v-dialog v-model="dialog" max-width="600" scrollable>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot />
      </div>
    </template>
    <v-card color="white" rounded="lg">
      <v-card-text style="height: 600px" class="py-4 py-sm-5 px-5 px-sm-7 pb-0">
        <h2 class="text-h6 font-weight-bold black--text">What is it?</h2>
        <p class="text-body-2 black--text">
          {{ appName }} is a free web app that allows you to easily and securely
          share files directly between devices without uploading them to any
          server first.
        </p>

        <h2 class="text-h6 font-weight-bold black--text">How to use it?</h2>
        <p class="text-body-2 black--text">
          Sharing files between devices in a local network* To send a file to
          another device in the same local network, open our website on both
          devices. Drag and drop a file directly on another person's avatar or
          click the avatar and select the file you want to send. The file
          transfer will start once the recipient accepts the file.
        </p>
        <p class="text-body-2 black--text">
          Sharing files between devices in different networks To send a file to
          another device in a different network, click + button in the upper
          right corner of the page and follow further instructions.
        </p>

        <h2 class="text-h6 font-weight-bold black--text">Security</h2>
        <p class="text-body-2 black--text">
          {{ appName }} uses a secure and encrypted peer-to-peer connection to
          transfer information about the file (its name and size) and file data
          itself. This means that this data is never transfered through any
          intermediate server but directly between the sender and recipient
          devices. To achieve this, {{ appName }} uses a technology called
          WebRTC (Web Real-Time Communication), which is provided natively by
          browsers. You can read more about WebRTC security here.
        </p>

        <h2 class="text-h6 font-weight-bold black--text">Feedback</h2>
        <p class="text-body-2 black--text">
          Got a problem with using {{ appName }}, suggestion how to improve it
          or just want to say hi? Send an email to support@{{ appName }}.com
        </p>
      </v-card-text>
      <div class="text-center ma-4 ma-sm-7">
        <v-btn
          color="gradient--color"
          class="text-capitalize px-10 px-sm-16"
          depressed
          large
          rounded
          dark
          @click="dialog = false"
        >
          Got It!
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      appName: null,
    }
  },
  computed: {
    defaultData() {
      return this.$store.state.defaultData
    },
  },
  watch: {
    defaultData(data) {
      this.appName = data.appName
    },
  },
}
</script>
