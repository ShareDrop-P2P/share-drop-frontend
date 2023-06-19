<template>
  <v-app dark>
    <v-sheet
      color="white"
      class="d-flex align-center justify-center flex-column text-center"
      height="100vh"
    >
      <v-icon color="red darken-1" class="mb-2" size="80">$svg-error</v-icon>
      <h1 v-if="error.statusCode === 404" class="text-h5 font-weight-bold">
        {{ pageNotFound }}
      </h1>
      <h1 v-else class="text-h5 font-weight-bold">
        {{ otherError }}
      </h1>
      <p class="text-body-2 ma-0 mt-1">
        Lorem Ipsum is simply dummy text of the <br />
        printing and typesetting industry.
      </p>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
