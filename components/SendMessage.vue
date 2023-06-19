<template>
  <v-card color="white" class="px-4 px-sm-6 py-4" flat tile>
    <v-form
      class="send-message-form d-flex align-center"
      @submit.prevent="sendMessage()"
    >
      <v-textarea
        v-model="message"
        color="black"
        placeholder="Write messages"
        background-color="gray-light"
        rows="1"
        row-height="15"
        auto-grow
        filled
        rounded
        hide-details
        @keypress="typing(true)"
        @keyup="typing(false)"
      />
      <div class="ml-3">
        <v-btn type="submit" color="gradient--color" fab depressed>
          <v-icon color="icon--white" size="30" class="mb-n1">$svg-send</v-icon>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      message: null,
    }
  },
  watch: {
    message(val) {
      if (!val) this.$store.dispatch('messages/typing', false)
    },
  },
  methods: {
    // Send Message on submit
    sendMessage() {
      if (this.message) {
        this.$store.dispatch('messages/sendMessage', this.message)
        this.message = null
      }
    },
    // Show & Hide typing dots when key up or down
    typing(status) {
      if (status) {
        this.$store.dispatch('messages/typing', true)
      } else {
        setTimeout(() => {
          this.$store.dispatch('messages/typing', false)
        }, 3000)
      }
    },
  },
}
</script>
