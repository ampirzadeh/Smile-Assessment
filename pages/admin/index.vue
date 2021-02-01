<template>
  <div class="min-h-screen p-10 bg-bgColor">
    <div class="flex">
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

    <div class="flex flex-col items-center justify-center my-20">
      <table class="max-w-screen-md bg-white shadow-lg">
        <tr>
          <th
            v-for="property in properties"
            :key="property"
            class="px-4 py-2 text-left bg-blue-100 border xl:px-8"
          >
            <small>
              {{
                property
                  .replace('_', '')
                  .charAt(0)
                  .toLocaleUpperCase() +
                  property.replace('_', '').slice(1, property.length)
              }}
            </small>
          </th>
        </tr>
        <tr v-for="record in records" :key="record._id">
          <td v-for="property in properties" :key="property" class="p-2 border">
            <small>
              <template
                v-if="property === 'createdAt' || property === 'updatedAt'"
              >
                {{ new Date(record[property]).toLocaleString() }}
              </template>
              <template v-else-if="property === 'sufferings'">
                {{ record[property].join(', ') }}
              </template>
              <template v-else-if="property === 'email'">
                <a
                  class="font-semibold text-accent"
                  :href="`mailto:${record[property]}`"
                  :title="record[property]"
                  >{{ record[property] }}</a
                >
              </template>
              <template v-else-if="property === 'phone'">
                <a
                  class="font-semibold text-accent"
                  :href="`tel:${record[property]}`"
                  :title="record[property]"
                  >{{ record[property] }}</a
                >
              </template>
              <template v-else-if="property === 'images'">
                <nuxt-link
                  :to="{
                    name: 'admin-images',
                    query: { images: record[property].join('__') }
                  }"
                  class="py-1 text-xs font-semibold text-white bg-opacity-75 btn bg-acce bg-accent hover:bg-opacity-100 focus:bg-opacity-100"
                  prefetch
                >
                  View Images
                </nuxt-link>
              </template>
              <template v-else>
                {{ record[property] }}
              </template>
            </small>
          </td>
        </tr>
      </table>
    </div>

    <Pagination v-if="pagesCount > 1" :max="pagesCount" :per-page="perPage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IRecord } from '~/api/db/Record'
export default Vue.extend({
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
    const { records, recordsCount } = await this.$axios.$get('/api/records', {
      params: {
        page: this.$route.query.page || 1,
        per_page: this.$route.query.per_page || 10,
        search: this.searchQuery || undefined
      }
    })

    this.records = records
    this.pagesCount = Math.ceil(recordsCount / this.perPage)
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
