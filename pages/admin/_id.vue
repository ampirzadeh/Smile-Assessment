<template>
  <div class="container mx-auto mt-10">
    <header class="flex flex-col items-start gap-3 mb-3">
      <button
        @click="$router.go(-1)"
        class="flex items-center w-auto gap-2 p-3 m-0 bg-white rounded-full outline-none focus:shadow-outline hover:shadow-outline focus:outline-none btn"
      >
        <BackIcon />
        Back
      </button>

      <section>
        <h1 class="text-2xl font-semibold font-montserrat">
          {{ fullName }}
        </h1>

        <p>{{ formattedGender }}, {{ record.age }}</p>
      </section>
    </header>

    <section>
      <h2 class="text-2xl font-semibold font-montserrat">Info:</h2>

      <p v-if="record.concerns">
        <b class="font-semibold">Concerns: </b> {{ record.concerns }}
      </p>

      <p v-if="record.sufferings.length">
        <b class="font-semibold">Sufferings: </b>
        {{ sufferings }}
      </p>

      <p v-if="record.treatments && record.treatments.length">
        <b class="font-semibold">Interested Treatments: </b>
        {{ treatments }}
      </p>

      <p v-if="record.reasons.length">
        <b class="font-semibold">Reason: </b>
        {{ reasons }}
      </p>
      <p v-if="record.teethDislike">
        <b class="font-semibold">Teeth Dislike: </b> {{ record.teethDislike }}
      </p>

      <p v-if="record.smileRate">
        <b class="font-semibold">Smile rating: </b> {{ record.smileRate }}
      </p>

      <p v-if="record.email">
        <b class="font-semibold">Email: </b> {{ record.email }}
      </p>

      <p v-if="record.phone">
        <b class="font-semibold">Phone: </b> {{ record.phone }}
      </p>
    </section>

    <modal
      classes="bg-white p-0"
      height="auto"
      :scrollable="true"
      name="imageOverlay"
      :adaptive="true"
    >
      <img
        :src="imageOverlayImageSource"
        alt="Selfie"
        class="w-full m-0 mx-auto"
      />
    </modal>

    <section class="my-6" v-if="record.images.length">
      <h2>Images:</h2>
      <transition-group
        name="grow"
        class="flex h-32 gap-3 overflow-x-auto overflow-y-hidden"
      >
        <img
          class="object-cover w-2/3 h-full rounded-md cursor-pointer md:w-auto"
          alt="Picture"
          v-for="image in images"
          :key="image"
          :src="image"
          @click="openOverlay(image)"
        />
      </transition-group>
    </section>

    <footer class="flex text-black">
      <Mailto
        :mail="record.email"
        title="Write me a email"
        href="mailto:"
        class="w-1/4 h-full py-3 text-base bg-bgColor btn"
        type="button"
      >
        Email: {{ record.email }}
      </Mailto>

      <a
        class="w-1/4 py-3 text-base btn bg-bgColor"
        :href="`tel:+${record.phone}`"
      >
        Phone: {{ record.phone }}
      </a>

      <button
        class="w-1/2 py-3 text-white btn bg-accent"
        type="button"
        @click="answered"
      >
        {{
          record.hasBeenAnsweredTo ? 'Mark as unanswered' : 'Mark as answered'
        }}
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BackIcon from '~/assets/icons/arrow-left.svg?inline'

export default Vue.extend({
  components: {
    BackIcon
  },
  transition: 'fade',
  head() {
    return { title: (this as any).fullName }
  },
  middleware: 'locked',
  async asyncData({ $axios, params, store }) {
    const record = await $axios.$get(`/api/records`, {
      params: { id: params.id },
      auth: {
        username: store.state.username,
        password: store.state.password
      }
    })
    return record
  },
  data() {
    return {
      imageOverlayImageSource: '',
      images: [] as any[]
    }
  },
  methods: {
    openOverlay(imageSrc: string): void {
      this.$modal.show('imageOverlay')
      this.imageOverlayImageSource = imageSrc
    },
    answered() {
      this.$axios
        .$post(
          '/api/toggleAnswered',
          {
            id: this.$route.params.id
          },
          {
            auth: {
              username: this.$store.state.username,
              password: this.$store.state.password
            }
          }
        )
        .then(() => {
          this.$router.push('/admin')
        })
    }
  },
  mounted() {
    const images = (this as any).record.images

    images.map((image: string, index: number) => {
      this.$axios
        .$get(`/api/image/${image}`, {
          auth: {
            username: this.$store.state.username,
            password: this.$store.state.password
          }
        })
        .then((res: { d: any }) => this.images.push(res.d))
    })
  },
  computed: {
    formattedGender(): string {
      const text = (this as any).record.gender
      return text.charAt(0).toLocaleUpperCase() + text.slice(1, text.length)
    },
    sufferings() {
      return (this as any).record.sufferings.join(', ')
    },
    treatments() {
      return (this as any).record.treatments.join(', ')
    },
    reasons() {
      return (this as any).record.reasons.join(', ')
    },
    fullName() {
      return `${(this as any).record.firstName}  ${
        (this as any).record.lastName
      }`
    },
    emailSubject: {
      get() {
        return (
          localStorage.getItem('emailSubject') || 'Smile Assessment Response'
        )
      },
      set(value: string) {
        localStorage.setItem('emailSubject', value)
      }
    },
    emailBody: {
      get() {
        return (
          localStorage.getItem('emailBody') || 'Smile Assessment Email Body'
        )
      },
      set(value: string) {
        localStorage.setItem('emailBody', value)
      }
    }
  }
})
</script>
