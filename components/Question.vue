<template>
  <div class="container w-full mx-auto my-4">
    <h3 class="px-3 pt-3 pb-1 m-0 font-semibold rounded-t md:px-6">{{ title }}</h3>
    <div class="flex flex-col flex-wrap px-3 sm:flex-row md:px-6">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>
