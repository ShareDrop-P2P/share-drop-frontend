<template>
  <div></div>
</template>

<script>
import crypto from 'crypto'

export default {
  name: 'IndexPage',
  beforeCreate() {
    // Random string generator for room ID
    const roomId = crypto.randomBytes(4).toString('hex')
    this.$router.push(`/${roomId}`)
  },
}
</script>
