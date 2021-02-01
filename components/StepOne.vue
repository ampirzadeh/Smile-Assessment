<template>
  <QuestionsContainer>
    <Question title="What is your gender?">
      <Option @click="gender = 'male'" :active="gender === 'male'">
        Male
      </Option>
      <Option @click="gender = 'female'" :active="gender === 'female'">
        Female
      </Option>
    </Question>

    <Question title="How old are you?">
      <Option
        v-for="(ageRange, index) in [
          '18 - 24',
          '25 - 34',
          '35 - 44',
          '45 - 54',
          '55 - 64',
          '65+'
        ]"
        @click="age = ageRange"
        :active="age === ageRange"
        :class="{ 'mx-2': index }"
        class="px-4"
        :key="ageRange"
      >
        {{ ageRange }}
      </Option>
    </Question>

    <Question title="Rate your smile">
      <label class="inline-flex items-center">
        <input
          v-model="smileRate"
          type="range"
          name="smileRate"
          id="smileRate"
          min="1"
          max="10"
        />
        <span class="ml-2">{{ smileRate }}</span>
      </label>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'StepOne',
  data() {
    return {
      gender: '',
      age: '',
      smileRate: 5
    }
  },
  watch: {
    gender() {
      this.$emit('input', this.$data)
    },
    age() {
      this.$emit('input', this.$data)
    },
    smileRate() {
      this.$emit('input', this.$data)
    }
  }
})
</script>
