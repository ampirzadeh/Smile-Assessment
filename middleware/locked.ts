import { Middleware } from '@nuxt/types'

const locked: Middleware = async ({ store, redirect, $axios }) => {
  if (!(store.state.username && store.state.password))
    return redirect('/admin/login')
  else {
    try {
      const isLoggedIn = await $axios.$get('/api/login', {
        auth: {
          password: store.state.password,
          username: store.state.username
        }
      })
    } catch (error) {
      redirect('/admin/login')
    }}
}

export default locked
