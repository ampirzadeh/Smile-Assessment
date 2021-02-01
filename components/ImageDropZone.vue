<template>
  <div
    :class="value.length >= 4 ? 'border-opacity-50 opacity-50' : 'cursor-pointer'"
    @click="clickFileInput"
    @drop.prevent="handleDrop"
    @dragover.prevent="() => {}"
    class="flex flex-col justify-center w-full p-10 text-center text-gray-600 align-middle border-4 border-gray-600 border-dashed rounded-md select-none sm:p-16"
  >
    <ImageIcon class="w-24 h-24 mx-auto" />
    <h2 class="font-semibold text-black">
      Drag & Drop
    </h2>
    <p class="text-sm text-gray-800">
      your file here or browse
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import ImageIcon from '~/assets/icons/image-open.svg?inline'

export default Vue.extend({
  components: {
    ImageIcon
  },
  props: {
    value: Array as PropType<string[]>
  },
  methods: {
    clickFileInput() {
      if (this.value.length < 4) {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.title = 'Upload Selfies'
        input.multiple = true
        input.click()

        input.addEventListener('change', () => {
          if (input.files?.length) this.$emit('input', input.files)
        })

        input.remove()
      }
    },
    handleDrop(e: DragEvent) {
      if (this.value.length < 4) {
        this.$emit('input', e.dataTransfer?.files)
      }
    }
  }
})
</script>
