<template>
  <fieldset class="flex flex-col transition-all duration-200 align-center">
    <p class="max-w-sm my-16 text-justify">
      Make your smile much more beautiful, show us your smile and get back our
      professional dentists' feedback.
    </p>

    <nuxt-link
      tag="button"
      :to="{ query: { step: (1).toString() } }"
      class="flex justify-center py-3 align-middle bg-white border border-solid lg:w-1/2 border-accent text-accent btn hover:bg-gray-200 focus:shadow-outline focus:outline-none"
      type="button"
      aria-label="Start"
      title="Start"
    >
      Start your journey
      <IconArrowRight class="mx-2 mt-1" />
    </nuxt-link>
  </fieldset>
</template>

<script lang="ts">
import Vue from 'vue'
import IconArrowRight from '~/assets/icons/arrow-right.svg?inline'

export default Vue.extend({
  components: {
    IconArrowRight
  }
})
</script>
