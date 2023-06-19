<template>
  <v-avatar :size="size" :color="`${image ? 'white' : 'gradient--color'}`">
    <v-img v-if="image" :src="image" :lazy-src="image" alt="User Image" />
    <span
      v-else
      :class="`text--white font-weight-bold text-uppercase ${
        size > 60 ? 'text-h6' : ''
      }`"
      v-text="firstLetters"
    />
  </v-avatar>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    image: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Get first characters of the name
    firstLetters() {
      let firstLetters

      if (this.name) {
        firstLetters = this.name
          .split(' ')
          .map((word) => word[0])
          .join('')
      }

      return firstLetters
    },
  },
}
</script>
