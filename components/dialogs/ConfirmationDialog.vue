<template>
  <v-dialog v-model="dialog" max-width="400" :overlay-opacity="0.8" persistent>
    <template #activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot />
      </div>
    </template>
    <v-card color="white" rounded="lg">
      <div class="pa-4 pa-sm-7">
        <h3 class="text-body-1 text-sm-h6 font-weight-regular mb-4 ml-1">
          Are you sure to perform this action?
        </h3>
        <v-row>
          <v-col cols="12" sm="6" class="pb-0 pb-sm-3">
            <v-btn
              color="gradient--color"
              class="text--white text-capitalize"
              depressed
              large
              rounded
              block
              @click="submit()"
            >
              Confirm
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              color="black"
              class="white--text text-capitalize"
              depressed
              large
              rounded
              dark
              block
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    data: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    submit() {
      switch (this.type) {
        case 'REMOVE_ONE':
          this.$store.commit('files/REMOVE', this.data)
          break

        case 'REMOVE_ALL':
          this.$store.commit('files/REMOVE_ALL')
          break

        case 'REJECT_ALL':
          this.$store.commit('files/REJECT_ALL')
          break

        case 'DISMISS_ALL':
          this.$store.commit('files/DISMISS_ALL')
          break

        case 'CANCEL_ALL':
          this.$store.commit('files/CANCEL_ALL')
          break

        case 'REMOVE_NOTIFICATION':
          this.$store.commit('notifications/REMOVE_NOTIFICATION', this.data.id)
          break
      }

      this.dialog = false
    },
  },
}
</script>
