<template>
  <div class="pa-4 d-flex justify-start align-center">
    <UserAvatar :name="user.name" :image="user.avatar" :size="45" />
    <div class="ml-4">
      <div class="d-flex align-center justify-start">
        <v-card width="100px" color="gray-light" class="pa-6 rounded-xl" flat>
          <span class="dots-cont">
            <span class="dot dot-1 gradient--color" />
            <span class="dot dot-2 gradient--color" />
            <span class="dot dot-3 gradient--color" />
          </span>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    user: {
      type: Object,
      required: false,
    },
  },
}
</script>

<style lang="sass" scoped>
.dots-cont
  position: absolute
  top: 50%
  -webkit-transform: translateY(-50%)
  -ms-transform: translateY(-50%)
  transform: translateY(-50%)
  bottom: 0

.dot
  width: 12px
  height: 12px
  background: #fff
  display: inline-block
  border-radius: 50%
  right: 0
  bottom: 0
  margin: 0 2.5px
  position: relative
  animation: jump 1s infinite

.dots-cont:hover > .dot
  animation: none

.dots-cont .dot-1
  -webkit-animation-delay: 100ms
  animation-delay: 100ms

.dots-cont .dot-2
  -webkit-animation-delay: 200ms
  animation-delay: 200ms

.dots-cont .dot-3
  -webkit-animation-delay: 300ms
  animation-delay: 300ms

@keyframes jump
  0%
    bottom: 0px

  20%
    bottom: 5px

  40%
    bottom: 0px
</style>
