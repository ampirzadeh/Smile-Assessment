<template>
  <div>
    <header
      class="flex items-center justify-between w-full px-6 py-2 align-middle bg-white"
    >
      <img
        class="w-auto h-10 md:h-16"
        src="~/assets/icons/logo.png"
        alt="Museum Dental Suites"
      />
      <StepCircles v-if="!!step" :step="step" :max-step="maxStep" />
    </header>

    <main
      class="min-h-screen"
      :class="{ 'bg-primary': $route.name !== 'admin-id' }"
    >
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  watch: {
    $route() {
      this.step = parseInt((this.$route.query.step as string) || '0')
      if (this.step > this.maxStep) this.maxStep = this.step
    }
  },
  data() {
    return {
      step: parseInt((this.$route.query.step as string) || '0'),
      maxStep: 0
    }
  }
})
</script>

<style>
.grow-enter-active,
.grow-leave-active {
  transition: all 0.3s;
}
.grow-enter,
.grow-leave-to {
  opacity: 0;
  width: 0px;
  height: 0px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-no-leave-leave-active {
  transition: none;
  transition-duration: 0ms;
}

.fade-no-leave-enter-active {
  transition: opacity 0.3s;
}
.fade-no-leave-enter,
.fade-no-leave-leave-to {
  opacity: 0;
}
</style>
