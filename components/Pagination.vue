<template>
  <div class="flex items-center justify-center">
    <slot />
    
    <nuxt-link
      class="flex items-center justify-center w-10 h-10 p-5 mx-1 rounded-full"
      :class="$route.query.page == i ? 'bg-accent text-white' : 'bg-white'"
      :to="{ query: { ...$route.query, page: i } }"
      v-for="i in max > max * perPage ? max * perPage : max"
      :key="i"
    >
      {{ i }}
    </nuxt-link>
    <div
      v-if="max > max * perPage"
      class="flex items-center justify-center w-10 h-10 p-5 mx-1 bg-blue-100 rounded-full"
    >
      ...
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    max: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: false,
      default: 10
    }
  }
})
</script>
