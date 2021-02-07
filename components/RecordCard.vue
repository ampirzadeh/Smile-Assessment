<template>
  <nuxt-link
    :to="{ name: 'admin-id', params: { id: record._id } }"
    prefetch
    class="flex flex-col w-full p-6 text-sm transition-all duration-300 bg-white rounded-md shadow md:w-1/3 lg:w-1/4"
  >
    <h1 class="text-lg font-semibold font-montserrat">
      {{ fullName }}
    </h1>
    <small class="text-opacity-75"> {{ gender }}, {{ record.age }} </small>

    <p v-if="sufferings.length">
      <b class="font-semibold">Sufferings:</b>
      {{ sufferings }}
    </p>

    <p v-if="reasons.length">
      <b class="font-semibold">Reasons:</b>
      {{ reasons }}
    </p>

    <p v-if="concerns.length">
      <b class="font-semibold">Concers: </b>
      {{ concerns }}
    </p>
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Record } from '~/api/db/Record'

export default Vue.extend({
  props: {
    record: {
      type: Object as PropType<Record>,
      required: true
    }
  },
  computed: {
    gender() {
      const text = this.record.gender
      return text.charAt(0).toLocaleUpperCase() + text.slice(1, text.length)
    },
    sufferings() {
      return this.record.sufferings.splice(0, 2).join(', ')
    },
    fullName() {
      return `${(this as any).record.firstName} ${
        (this as any).record.lastName
      }`
    },
    reasons() {
      return this.record.reasons.splice(0, 2).join(', ')
    },
    concerns() {
      return this.record.concerns?.slice(0, 100)
    }
  }
})
</script>
