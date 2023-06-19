<template>
  <div class="px-4 px-sm-6">
    <div class="d-none d-sm-block">
      <ActionButtons />
    </div>
    <div class="d-block d-sm-none">
      <MobileActionButtons />
    </div>
    <v-scroll-y-transition group>
      <div v-for="file in files" :key="file.id">
        <FileItem class="d-none d-sm-block" :file="file" />
        <MobileFileItem class="d-block d-sm-none" :file="file" />
      </div>
    </v-scroll-y-transition>
    <div class="pa-4" />
  </div>
</template>

<script>
export default {
  computed: {
    files() {
      return this.$store.state.files.previews
    },
  },
}
</script>
