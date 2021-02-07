<template>
  <QuestionsContainer>
    <Question title="Which ones do you suffer from?">
      <Option
        v-for="item in [
          'Sensitive teeth',
          'Stained teeth',
          'Bad teeth',
          'Crooked teeth',
          'Mouth ulcers',
          'Gaps or spaces',
          'Yellow tongue',
          'Painful teeth'
        ]"
        :key="item"
        @click="
          sufferings.includes(item)
            ? sufferings.splice(sufferings.indexOf(item), 1)
            : sufferings.push(item)
        "
        :active="sufferings.includes(item)"
      >
        {{ item }}
      </Option>
    </Question>

    <Question title="What are your other concerns?">
      <label class="w-full">
        <textarea
          class="block w-full mt-1 text-black resize-none rounded-xl form-textarea"
          v-model="concerns"
          rows="5"
          placeholder="Please describe"
        />
      </label>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'StepTwo',
  data() {
    return {
      sufferings: [],
      concerns: ''
    }
  },
  watch: {
    sufferings() {
      this.$emit('input', this.$data)
    },
    concerns() {
      this.$emit('input', this.$data)
    }
  }
})
</script>
