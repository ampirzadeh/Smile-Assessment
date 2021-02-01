// import ToastInterface from 'vue-toastification/dist/types/src/ts/interface'

// declare module 'vue/types/vue' {
//   interface Vue {
//     $toast: ReturnType<typeof ToastInterface>
//   }
// }

// declare module '@nuxt/types' {
//   interface Context {
//     $toast: ReturnType<typeof ToastInterface>
//   }
// }
declare module '*.svg?inline' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}
