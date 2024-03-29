<template>
  <QuestionsContainer>
    <Question title="Upload your photos:">
      <p class="mt-0">Use sample photos and upload one photo for each sample</p>

      <div
        class="relative flex flex-wrap items-center justify-around w-full gap-3 mt-4"
      >
        <label
          v-for="(image, index) in images"
          :key="`image-${index}-${keys[index]}`"
          class="w-full sm:w-5/12"
        >
          <img class="object-cover w-full h-full rounded-md" :src="image" />
          <input
            accept="image/*"
            class="absolute w-0 h-0 opacity-0"
            type="file"
            @change="replaceImage($event, index)"
          />
          <span
            role="button"
            class="w-full mx-0 outline-none btn bg-accent focus:shadow-outline hover:shadow-outline focus:outline-none"
          >
            Upload this photo
          </span>
        </label>
      </div>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageIcon from '~/assets/icons/image-open.svg?inline'

import ImageBlobReduce from 'image-blob-reduce'

const reduce = ImageBlobReduce()

export default Vue.extend({
  name: 'StepFive',
  components: {
    ImageIcon
  },
  data() {
    return {
      images: [
        '/images/samples/front-photo.png',
        '/images/samples/smile.png',
        '/images/samples/right-smile.png'
      ] as string[],
      keys: ([] as number[]).fill.call({ length: 3 }, 1) as number[],
      imageBlobs: [] as Blob[]
    }
  },
  methods: {
    replaceImage(event: Event, index: number): void {
      event.preventDefault()
      const input: any = event.target

      if (!input || !input.files.length || !input.files[0]) return

      this.images[index] = URL.createObjectURL(input.files[0])
      this.imageBlobs[index] = input.files[0]

      this.saveData()

      this.keys[index] += 1
    },
    removeImage(index: number) {
      this.images.splice(index, 1)
      this.imageBlobs.splice(index, 1)
      this.saveData()
    },
    saveData() {
      const reducedSizeImages: Blob[] = []

      this.imageBlobs.map(image =>
        reduce
          .toBlob(image, {
            max: 200,
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          })
          .then((res: Blob) => reducedSizeImages.push(res))
      )
      this.$emit('input', { images: reducedSizeImages })
    }
  }
})
</script>
