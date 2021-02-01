<template>
  <QuestionsContainer>
    <Question title="Which treatments are you interested in?">
      <Option
        v-for="item in [
          'Whiter teeth',
          'Repair chipped teeth',
          'Close spaces and gaps',
          'Replace old dental treatment',
          'Tooth coloured fillings',
          'Straighter teeth',
          'Replace missing teeth',
          'Stabilise my denture',
          'Replace wobbly & loose teeth',
          'Help with my eating',
          'Remove stains',
          'Treat bleeding gums',
          'Another reason'
        ]"
        :key="item"
        @click="
          treatments.includes(item)
            ? treatments.splice(treatments.indexOf(item), 1)
            : treatments.push(item)
        "
        :active="treatments.includes(item)"
      >
        {{ item }}
      </Option>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "StepFour",
  data() {
    return {
      treatments: []
    }
  },
  watch: {
    treatments() {
      this.$emit('input', this.$data)
    }
  }
})
</script>