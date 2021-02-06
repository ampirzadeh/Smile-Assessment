<template>
  <div class="min-h-screen p-10 bg-bgColor">
    <template v-if="records.length">
      <div class="flex mb-6">
        <label class="flex flex-col flex-1 max-w-screen-md mx-12 mr-auto">
          Search email, first name, last name, or phone:
          <input
            @keyup.enter="
              $router.push({
                query: { ...$route.query, search: searchQuery }
              })
            "
            type="text"
            class="w-full form-input rounded-xl"
            v-model="searchQuery"
            id="search"
            name="search"
          />
        </label>

        <label class="flex flex-col flex-1 mx-12"
          >Items shown per page:
          <input
            @keyup.enter="
              $router.push({
                query: { ...$route.query, per_page: perPage.toString() }
              })
            "
            type="number"
            name="perpage"
            id="perpage"
            class="block w-full text-gray-900 form-input rounded-xl"
            v-model="perPage"
          />
        </label>
      </div>

      <div class="flex flex-row gap-2">
        <RecordCard
          v-for="record in records"
          :key="record._id"
          :record="record"
        />
      </div>

      <Pagination v-if="pagesCount > 1" :max="pagesCount" :per-page="perPage" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IRecord } from '~/api/db/Record'

export default Vue.extend({
  head: {
    title: "Admin Panel"
  },
  middleware: 'locked',
  watch: {
    '$route.query'() {
      this.$fetch()
    }
  },
  created() {
    if (
      parseInt(this.$route.query.page as string).toString() !==
        this.$route.query.page ||
      !this.$route.query.page ||
      parseInt(this.$route.query.page as string) <= 0
    )
      this.$router.replace({ query: { page: '1' } })
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
        search: this.searchQuery || undefined
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
      properties: [
        // '_id',
        'gender',
        'age',
        'firstName',
        'lastName',
        'smileRate',
        'createdAt',
        'sufferings',
        'phone',
        'email',
        'images'
      ]
    }
  }
})
</script>
