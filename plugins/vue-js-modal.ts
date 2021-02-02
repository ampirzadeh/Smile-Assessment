import Vue, { ComponentOptions, AsyncComponent } from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)

interface Modal {
  show(name: string, params?: object): void
  show(
    component: typeof Vue | ComponentOptions<Vue> | AsyncComponent,
    componentProps?: object,
    modalProps?: object,
    modalEvents?: object
  ): void
  hide(name: string, params?: object): void
  hideAll(): void
  toggle(name: string, params?: object): void
}

declare module 'vue/types/vue' {
  // this.$modal inside Vue components
  interface Vue {
    $modal: Modal
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$modal inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $modal: Modal
  }
  // nuxtContext.$modal
  interface Context {
    $modal: Modal
  }
}

declare module 'vuex/types/index' {
  // this.$modal inside Vuex stores
  interface Store<S> {
    $modal: Modal
  }
}

/*
export default function(_, inject) {
  inject('modal', VModal)
}
*/