<template>
  <div class="px-2 py-10 md:px-10">
    <header class="flex items-end">
      <div class="flex max-w-full tabs">
        <nuxt-link
          :to="{
            query: {
              search: searchQuery,
              per_page: perPage.toString(),
              page: '1',
              show_answered: 'false'
            }
          }"
          class="p-4 mx-0 mb-0 mr-2 bg-transparent rounded-b-none btn"
          role="button"
          :class="
            $route.query.show_answered === 'false'
              ? 'bg-white text-black'
              : 'text-white hover:bg-white hover:bg-opacity-25 focus:bg-white focus:bg-opacity-25'
          "
        >
          <span>New Smiles</span>
        </nuxt-link>
        <nuxt-link
          :to="{
            query: {
              search: searchQuery,
              per_page: perPage.toString(),
              page: '1',
              show_answered: 'true'
            }
          }"
          class="p-4 mx-0 mb-0 mr-2 bg-transparent rounded-b-none btn"
          role="button"
          :class="
            $route.query.show_answered === 'true'
              ? 'bg-white text-black'
              : 'text-white hover:bg-white hover:bg-opacity-25 focus:bg-white focus:bg-opacity-25'
          "
        >
          <span>Archive</span>
        </nuxt-link>
      </div>

      <div class="flex-grow"></div>

      <form class="w-1/2 mb-auto md:w-1/3" @submit.prevent="updateQuery">
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
      </form>
    </header>

    <template v-if="records.length">
      <transition-group
        tag="section"
        name="fade-no-leave"
        class="flex flex-wrap gap-2"
      >
        <RecordCard
          v-for="(record, index) in records"
          :key="record._id"
          :record="record"
          :index="index"
        />
      </transition-group>

      <Pagination
        v-if="pagesCount > 1"
        class="absolute bottom-0 left-0 right-0 m-10"
        :max="pagesCount"
        :per-page="perPage"
      />
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
