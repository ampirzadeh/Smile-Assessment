import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ $axios }) => {
  $axios.onResponse(response => {
    if (response.data.success === false) {
      return Promise.reject(response)
    }
  })
}

export default plugin
