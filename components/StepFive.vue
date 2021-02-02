<template>
  <QuestionsContainer>
    <Question title="Upload your photos:">
      <p>Use sample photos and upload one photo for each sample</p>
      <div class="flex flex-col mx-auto mt-4 md:flex-row">
        <div class="hidden w-1/2 h-full mb-6 md:block">
          <ImageDropZone :value="showImages" @input="updateshowImages" />
        </div>
        <div class="w-full mx-auto mb-6 md:hidden md:mx-0">
          <input
            :disabled="showImages.length >= 4"
            multiple
            @input="updateshowImages($event.target.files)"
            type="file"
            accept="image/*"
          />
        </div>

        <div
          class="flex flex-col flex-wrap items-start justify-between max-w-screen-sm gap-1 mx-auto overflow-x-hidden overflow-y-auto md:flex-row md:px-6 md:mx-0 md:w-1/2"
        >
          <div
            class="relative flex-1 w-full shadow-md md:flex-initial rounded-3xl md:w-5/12"
            v-for="(image, index) in showImages.length
              ? showImages
              : ['front-photo', 'smile', 'left-smile', 'right-smile']"
            :key="image"
          >
            <img
              class="object-cover w-full bg-center rounded-md"
              alt="Image"
              :src="showImages.length ? image : `/images/samples/${image}.png`"
            />
            <button
              class="absolute bottom-0 right-0 py-1 m-2 text-sm font-semibold bg-white shadow-lg text-red btn"
              title="Remove Image"
              @click="removeImage(index)"
              v-if="showImages.length"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageIcon from '~/assets/icons/image-open.svg?inline'

export default Vue.extend({
  name: 'StepFive',
  components: {
    ImageIcon
  },
  data() {
    return {
      showImages: [] as string[],
      images: [] as Blob[]
    }
  },
  methods: {
    updateshowImages(files: FileList) {
      for (let filesCounter = 0; filesCounter < files.length; filesCounter++) {
        const file = files.item(filesCounter)
        if (file && file.type.includes('image/')) {
          this.showImages.push(URL.createObjectURL(file))
          this.images.push(file)
        }
      }
      if (this.showImages.length > 4)
        this.showImages = this.showImages.slice(0, 4)
      if (this.images.length > 4) this.images = this.images.slice(0, 4)
    },
    removeImage(index: number) {
      this.showImages.splice(index, 1)
      this.images.splice(index, 1)
    }
  },
  watch: {
    showImages() {
      this.$emit('input', { images: this.images })
    }
  }
})
</script>
