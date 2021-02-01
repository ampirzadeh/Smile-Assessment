<template>
  <div class="container w-full my-4 text-gray-900">
    <h3 class="px-6 pt-3 pb-1 m-0 font-semibold rounded-t">{{ title }}</h3>
    <div class="px-6">
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
