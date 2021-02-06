<template>
  <QuestionsContainer>
    <Question title="Result">
      <p>
        To receive your smile assessment results, along with a complimentary
        consultation with our treatment coordinator, please complete your
        details below:
      </p>

      <form class="w-full">
        <label class="block my-6">
          <span class="hidden">First Name</span>
          <input
            type="text"
            class="block w-full text-gray-900 form-input rounded-xl"
            placeholder="First Name"
            v-model="firstName"
            required
          />
        </label>
        <label class="block my-6">
          <span class="hidden">Last Name</span>
          <input
            type="text"
            class="block w-full text-gray-900 form-input rounded-xl"
            placeholder="Last Name"
            v-model="lastName"
            required
          />
        </label>
        <label class="block my-6">
          <span class="hidden">E-mail address</span>
          <input
            type="email"
            class="block w-full text-gray-900 form-input rounded-xl"
            placeholder="E-mail"
            v-model="email"
            required
          />
        </label>
        <label class="block my-6">
          <span class="hidden">Phone number</span>
          <input
            type="tel"
            class="block w-full text-gray-900 form-input rounded-xl"
            autocomplete="tel"
            placeholder="Phone number"
            v-model="phone"
            required
          />
        </label>
      </form>
    </Question>
  </QuestionsContainer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'StepSix',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  },
  watch: {
    firstName() {
      this.saveData()
    },
    lastName() {
      this.saveData()
    },
    email() {
      this.saveData()
    },
    phone() {
      this.saveData()
    }
  },
  methods: {
    saveData() {
      const phoneNumberRegEx = /^\d+$/
      if (!!this.phone && !phoneNumberRegEx.test(this.phone.toString()))
        return this.$emit('input', { ...this.$data, phone: '' })

      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!!this.email && !emailRegEx.test(this.email.toLocaleLowerCase()))
        return this.$emit('input', { ...this.$data, email: '' })

      this.$emit('input', this.$data)
    }
  }
})
</script>
