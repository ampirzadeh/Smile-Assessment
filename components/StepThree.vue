<template>
  <QuestionsContainer>
    <Question title="What is your reason for wanting to improve your smile?">
      <Option
        v-for="item in [
          'For improved self confidence',
          'I would like to eat with more ease',
          'For my career reasons',
          'For a special event',
          'Other'
        ]"
        :key="item"
        @click="
          reasons.includes(item)
            ? reasons.splice(reasons.indexOf(item), 1)
            : reasons.push(item)
        "
        :active="reasons.includes(item)"
      >
        {{ item }}
      </Option>
    </Question>

    <Question title="What don't you like about your teeth?">
      <label class="w-full">
        <textarea
          class="block w-full mt-1 text-gray-900 resize-none rounded-xl form-textarea"
          v-model="teethDislike"
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
  name: 'StepThreen',
  data() {
    return {
      reasons: [],
      teethDislike: ''
    }
  },
  watch: {
    reasons() {
      this.$emit('input', this.$data)
    },
    teethDislike() {
      this.$emit('input', this.$data)
    }
  }
})
</script>
