<template>
  <div class="flex w-screen min-h-screen mx-auto">
    <form
      @submit.prevent="login"
      class="flex flex-col justify-between px-16 py-10 m-auto mt-10 bg-white rounded-md shadow-lg h-80"
    >
      <label class="flex flex-col" for="username">
        Username
        <input
          name="username"
          id="username"
          type="text"
          class="form-input"
          v-model="username"
        />
      </label>

      <label class="flex flex-col" for="password">
        Password
        <input
          name="password"
          id="password"
          type="password"
          class="form-input"
          v-model="password"
        />
      </label>

      <button
        type="submit"
        class="py-2 mx-0 outline-none btn bg-bgColor focus:outline-none focus:shadow-outline hover:shadow-outline"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$axios
        .get('/api/login', {
          auth: {
            username: this.username,
            password: this.password
          }
        })
        .then(res => {
          this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          })

          this.$router.replace('/admin')
        })
        .catch(e => console.log(e))
    }
  }
})
</script>
