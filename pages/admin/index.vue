<template>
  <div class="min-h-screen p-10 bg-primary">
    <form
      @submit.prevent="
        $router.push({
          ...$route.query,
          search: searchQuery,
          per_page: perPage.toString(),
          page: '1'
        })
      "
      class="flex flex-wrap"
    >
      <label
        class="flex flex-col flex-1 max-w-screen-md mx-12 mr-auto text-white"
      >
        Search email, first name, last name, or phone:
        <input
          @keyup.enter="
            $router.push({
              query: {
                ...$route.query,
                search: searchQuery,
                per_page: perPage.toString(),
                page: '1'
              }
            })
          "
          type="text"
          class="w-full text-black form-input rounded-xl"
          v-model="searchQuery"
          id="search"
          name="search"
        />
      </label>

      <label class="flex flex-col flex-1 mx-12 text-white"
        >Items shown per page:
        <input
          @keyup.enter="
            $router.push({
              query: {
                ...$route.query,
                search: searchQuery,
                per_page: perPage.toString(),
                page: '1'
              }
            })
          "
          type="number"
          name="perpage"
          id="perpage"
          class="block w-full text-black form-input rounded-xl"
          v-model="perPage"
        />
      </label>

      <label
        class="flex items-center justify-center w-full mx-auto mt-5 text-white"
      >
        <input
          v-model="showAnswered"
          @change="updateQuery"
          name="answered"
          type="checkbox"
          class="form-checkbox"
        />
        <span class="ml-2">Show Answered</span>
      </label>
    </form>

    <template v-if="records.length">
      <transition-group name="fade-no-leave" class="flex flex-row gap-2 my-6">
        <RecordCard
          v-for="record in records"
          :key="record._id"
          :record="record"
        />
      </transition-group>

      <Pagination v-if="pagesCount > 1" :max="pagesCount" :per-page="perPage" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IRecord } from '~/api/db/Record'

export default Vue.extend({
  transition: 'fade',
  head: {
    title: 'Admin Panel'
  },
  middleware: 'locked',
  watch: {
    '$route.query'() {
      this.$fetch()
    }
  },
  methods: {
    updateQuery() {
      this.$router.push({
        query: {
          ...this.$route.query,
          search: this.searchQuery,
          per_page: this.perPage.toString(),
          page: '1',
          show_answered: this.showAnswered.toString()
        }
      })
    }
  },
  created() {
    if (
      parseInt(this.$route.query.page as string).toString() !==
        this.$route.query.page ||
      !this.$route.query.page ||
      parseInt(this.$route.query.page as string) <= 0
    )
      this.$router.replace({
        query: { page: '1', show_answered: 'false' }
      })
  },
  async fetch() {
    const data = await this.$axios.$get('/api/records', {
      auth: {
        username: this.$store.state.username,
        password: this.$store.state.password
      },
      params: {
        page: this.$route.query.page || 1,
        per_page: this.$route.query.per_page || 10,
        search: this.searchQuery || undefined,
        show_answered: this.showAnswered || false
      }
    })

    this.records = data.records
    this.pagesCount = Math.ceil(data.recordsCount / this.perPage)
  },
  data() {
    return {
      records: [] as IRecord[],
      perPage: parseInt(this.$route.query.per_page as string) || 10,
      pagesCount: 0,
      searchQuery: this.$route.query.search || '',
      showAnswered: this.$route.query.show_answered === 'true'
    }
  }
})
</script>
