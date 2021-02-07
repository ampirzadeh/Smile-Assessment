<template>
  <div class="container w-full mx-auto my-2">
    <h3 class="px-3 m-0 font-semibold rounded-t md:px-6">{{ title }}</h3>
    <div class="flex flex-wrap justify-around px-3 md:px-6">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
