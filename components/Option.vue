<template>
  <button
    v-bind="$attrs"
    @click="$emit('click', $event)"
    class="flex-auto text-black border border-solid shadow outline-none btn hover:text-textAccent focus:text-white border-circleBorder focus:shadow-outline focus:outline-none"
    :class="
      active
        ? 'bg-accent focus:text-white focus:bg-accent hover:bg-accent hover:text-white hover:opacity-75 text-white'
        : ''
    "
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    active: {
      required: true,
      default: false,
      type: Boolean
    }
  }
})
</script>
