<template>
  <div class="flex items-center gap-2">
    <div class="flex-grow"></div>

    <nuxt-link
      class="flex items-center justify-center w-10 h-10 p-5 rounded-full"
      :class="$route.query.page == i ? 'bg-accent text-white' : 'bg-white'"
      :to="{ query: { ...$route.query, page: i } }"
      v-for="i in (max > max * perPage ? max * perPage : max)"
      :key="i"
    >
      {{ i }}
    </nuxt-link>
    <div
      v-if="max > max * perPage"
      class="flex items-center justify-center w-10 h-10 p-5 bg-blue-100 rounded-full"
    >
      ...
    </div>

    <div class="flex-grow"></div>

    <label class="text-white">
      Items per page:
      <input
        title="Number of items shown in every page"
        @keyup.enter="updateQuery"
        type="number"
        name="perpage"
        id="perpage"
        class="w-20 text-black rounded-full form-input"
        v-model="perPage"
      />
    </label>
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
