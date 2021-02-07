<template>
  <div class="min-h-screen px-2 py-10 md:px-10 bg-primary">
    <form
      @submit.prevent="updateQuery"
      class="flex flex-col items-end justify-between gap-2 px-3 md:flex-row"
    >
      <label class="flex flex-col w-full mr-auto text-white">
        Search email, first name, last name, or phone:
        <input
          @keyup.enter="updateQuery"
          type="text"
          class="w-full text-black form-input rounded-xl"
          v-model="searchQuery"
          id="search"
          name="search"
        />
      </label>

      <label class="flex flex-col w-full text-white"
        >Items shown per page:
        <input
          @keyup.enter="updateQuery"
          type="number"
          name="perpage"
          id="perpage"
          class="block w-full text-black form-input rounded-xl"
          v-model="perPage"
        />
      </label>
    </form>

    <nuxt-link
      :to="{
        query: {
          search: searchQuery,
          per_page: perPage.toString(),
          page: '1',
          show_answered:
            $route.query.show_answered === 'true' ? 'false' : 'true'
        }
      }"
      class="flex w-full mt-6 text-white bg-transparent btn"
      role="button"
    >
      <RefreshIcon class="mx-auto" />
      <span class="mr-auto">{{
        $route.query.show_answered === 'true' ? 'Answered' : 'Not Answered'
      }}</span>
    </nuxt-link>

    <template v-if="records.length">
      <transition-group
        name="fade-no-leave"
        class="flex flex-row flex-wrap gap-2 mb-6"
      >
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
import RefreshIcon from '~/assets/icons/refresh-cw.svg?inline'

export default Vue.extend({
  components: {
    RefreshIcon
  },
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
          show_answered: this.$route.query.show_answered
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
        show_answered: this.$route.query.show_answered
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
      searchQuery: this.$route.query.search || ''
    }
  }
})
</script>
