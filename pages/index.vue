<template>
  <div class="min-h-screen bg-right-top bg-no-repeat bg-bgColor lg:bg-bgImage">
    <div class="md:flex">
      <section class="px-2 py-16 text-white md:px-24 xl:w-8/12">
        <h1
          :class="step ? 'text-2xl' : 'text-3xl'"
          class="transition-all duration-200 delay-200"
        >
          Smile Assessment Tool
        </h1>

        <br />

        <transition name="fade">
          <StepZero v-show="step === 0" />
        </transition>
        <transition name="fade">
          <StepOne v-show="step === 1" v-model="stepOne" />
        </transition>
        <transition name="fade">
          <StepTwo v-show="step === 2" v-model="stepTwo" />
        </transition>
        <transition name="fade">
          <StepThree v-show="step === 3" v-model="stepThree" />
        </transition>
        <transition name="fade">
          <StepFour v-show="step === 4" v-model="stepFour" />
        </transition>
        <transition name="fade">
          <StepFive v-show="step === 5" v-model="stepFive" />
        </transition>
        <transition name="fade">
          <StepSix v-show="step === 6" v-model="stepSix" />
        </transition>
      </section>
    </div>

    <div class="flex" v-if="step !== 0">
      <div class="flex w-10/12 ml-auto mr-10 md:w-4/12">
        <nuxt-link
          class="flex justify-center w-full text-white align-middle transition-all duration-300 bg-transparent btn hover:bg-white hover:text-white hover:opacity-100 hover:bg-opacity-25 focus:shadow-outline focus:outline-none"
          aria-label="Previous"
          title="Previous"
          :to="{ query: { step: (step - 1).toString() } }"
        >
          <IconArrowLeft class="mx-2 mt-1" />
          Previous
        </nuxt-link>

        <nuxt-link
          tag="button"
          class="flex justify-center w-full pl-6 align-middle bg-white border border-solid border-accent text-accent btn hover:bg-gray-200 focus:shadow-outline focus:outline-none"
          aria-label="next"
          title="Next"
          v-if="step !== 6"
          :to="{ query: { step: (step + 1).toString() } }"
          :disabled="!nextStepAvailable"
          :class="{ 'opacity-75': !nextStepAvailable }"
          @click="$store.commit('nextStep')"
        >
          Next
          <IconArrowRight class="mx-2 mt-1" />
        </nuxt-link>

        <button
          class="w-full px-12 text-base text-gray-800 bg-white btn hover:bg-gray-200 focus:shadow-outline focus:outline-none"
          aria-label="Submit"
          title="Submit"
          v-else
          type="submit"
          @click.prevent="submitAnswers"
          :disabled="!nextStepAvailable"
          :class="{ 'opacity-75': !nextStepAvailable }"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IconArrowRight from '~/assets/icons/arrow-right.svg?inline'
import IconArrowLeft from '~/assets/icons/arrow-left.svg?inline'
import {
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
  StepFive,
  StepSix
} from '../@types'

export default Vue.extend({
  head: {
    title: 'Smile Assesment Form'
  },
  components: {
    IconArrowRight,
    IconArrowLeft
  },
  data() {
    return {
      step: 0,
      stepOne: {} as StepOne,
      stepTwo: {} as StepTwo,
      stepThree: {} as StepThree,
      stepFour: {} as StepFour,
      stepFive: { images: [] } as StepFive,
      stepSix: {} as StepSix
    }
  },
  mounted() {
    if (Object.keys(this.$route.query).length)
      this.$router.replace({ query: {} })
  },
  watch: {
    $route() {
      this.step = parseInt((this.$route.query.step as string) || '0')
    }
  },
  methods: {
    submitAnswers() {
      const data = {
        ...this.stepOne,
        ...this.stepTwo,
        ...this.stepThree,
        ...this.stepFour,
        ...this.stepFive,
        ...this.stepSix
      }
      const formData = new FormData()
      Object.keys(data).map(property => {
        if (property !== 'images') formData.set(property, data[property])
        else {
          for (
            let imageCounter = 0;
            imageCounter < data.images.length;
            imageCounter++
          ) {
            const image = data.images[imageCounter]

            formData.append('images', image)
          }
        }
      })

      this.$axios
        .$post('/api/saveRecord', formData, {
          headers: { 'content-type': 'multipart/form-data' }
        })
        .then(() => this.$router.push({ name: 'saved' }))
        .catch(() => (this.step = 1))
    }
  },
  computed: {
    nextStepAvailable() {
      let isValid: boolean = true
      let requiredFields: string[]
      switch (this.step) {
        case 1:
          requiredFields = ['gender', 'age', 'smileRate']
          requiredFields.forEach(field => {
            if (!(this.stepOne.hasOwnProperty(field) && this.stepOne[field])) {
              isValid = false
            }
          })
          break
        case 2:
          isValid = true
          requiredFields = ['sufferings']
          requiredFields.map(field => {
            if (
              !(
                this.stepTwo.hasOwnProperty(field) &&
                this.stepTwo[field]?.length
              )
            ) {
              isValid = false
            }
          })
          break
        case 3:
          if (
            this.stepThree.hasOwnProperty('reasons') &&
            this.stepThree['reasons']?.length
          ) {
            requiredFields = []
            if (this.stepThree.reasons.includes('Other'))
              requiredFields.push('teethDislike')
            requiredFields.map(field => {
              if (
                !(
                  this.stepThree.hasOwnProperty(field) &&
                  this.stepThree[field]?.length
                )
              ) {
                isValid = false
              }
            })
            break
          }
        case 4:
          requiredFields = ['treatments']
          requiredFields.map(field => {
            if (
              !(
                this.stepFour.hasOwnProperty(field) &&
                this.stepFour[field]?.length
              )
            ) {
              isValid = false
            }
          })
          break
        case 5:
          requiredFields = ['images']
          requiredFields.map(field => {
            if (
              !(
                this.stepFive.hasOwnProperty(field) &&
                this.stepFive[field]?.length
              )
            ) {
              isValid = false
            }
          })
          break
        case 6:
          requiredFields = ['firstName', 'lastName', 'email', 'phone']
          requiredFields.map(field => {
            if (
              !(
                this.stepSix.hasOwnProperty(field) &&
                this.stepSix[field]?.length
              )
            ) {
              isValid = false
            }
          })
          break
        default:
          return false
      }

      return isValid
    }
  }
})
</script>

<style>
.fade-enter-active {
  transition: opacity 0.2s;
}
.fade-leave-active {
  transition: none;
  transition-duration: 0ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
