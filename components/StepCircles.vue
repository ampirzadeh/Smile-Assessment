<template>
  <div v-bind="$attrs">
    <nuxt-link
      v-for="i in 6"
      :key="i"
      :to="
        i <= maxStep ? { query: { step: i.toString() } } : { query: { step } }
      "
      class="inline-flex items-center justify-center w-4 h-4 p-2 mx-1 text-xs font-semibold border-2 border-solid rounded-full md:text-sm lg:w-8 lg:h-8 border-circleBorder"
      :class="
        step === i
          ? `bg-accent text-white`
          : i <= maxStep
          ? 'bg-accent opacity-75 text-white'
          : 'bg-circleBackground text-circleTextColor'
      "
    >
      {{ i }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    step: {
      type: Number,
      required: false,
      default: 0
    },
    maxStep: {
      type: Number,
      required: false,
      default: 0
    }
  }
})
</script>
