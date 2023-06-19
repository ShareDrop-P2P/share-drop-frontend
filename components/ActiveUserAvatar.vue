<template>
  <div class="active-user">
    <UserAvatar
      class="avatar"
      :name="userName"
      :image="userAvatar"
      :size="56"
    />
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    userAvatar: {
      type: String,
      required: false,
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

<style lang="sass" scoped>
.active-user
  width: 80px
  height: 80px
  position: relative

  svg
    fill: none
    stroke: #26C884
    stroke-linecap: round
    stroke-width: 2
    stroke-dasharray: 5
    stroke-dashoffset: 0
    transform: rotate(-90deg)

  .avatar
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    border-radius: 50%
</style>
