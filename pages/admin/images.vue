<template>
  <div class="items-center justify-between pb-10 md:flex">
    <div class="flex lg:w-1/12 md:w-3/12 md:flex-col ">
      <img
        @click="chosenImage = image"
        v-for="image in images"
        :key="image"
        class="object-cover w-56 h-20 mx-4 my-3 shadow-lg cursor-pointer rounded-xl"
        :src="image"
      />
    </div>

    <img
      alt="Mouth Image"
      :src="chosenImage || images[0]"
      class="object-cover mx-auto my-10 bg-cover rounded-md md:w-8/12"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  data() {
    return {
      chosenImage: ''
    }
  },
  async asyncData({ $axios, query }) {
    const images = await $axios.$post(`/api/images`, {
      objects: (query as { images: string }).images.split('__')
    })
    return images
  }
})
</script>
