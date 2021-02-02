import { Plugin } from '@nuxt/types'

const plugin: Plugin = ({ $axios, redirect, store }) => {
  $axios.onResponse(response => {
    if (response.data.success === false) return Promise.reject(response)
    if (response.status === 401) return redirect('/admin/login')
  })
}

export default plugin
