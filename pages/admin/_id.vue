<template>
  <div class="container flex flex-col mx-auto mt-10">
    <header>
      <h1 class="text-2xl font-semibold font-montserrat">
        {{ record.firstName }} {{ record.lastName }}
      </h1>

      <p>{{ titlize(record.gender) }}, {{ record.age }}</p>
    </header>

    <section>
      <h2 class="text-2xl font-semibold font-montserrat">Info:</h2>

      <p v-if="record.concerns">
        <b class="font-semibold">Concerns: </b> {{ record.concerns }}
      </p>

      <p v-if="record.sufferings.length">
        <b class="font-semibold">Sufferings: </b>
        {{ record.sufferings.join(', ') }}
      </p>

      <p
        v-if="record.treatments && record.treatments.length"
      >
        <b class="font-semibold">Interested Treatments: </b>
        {{ record.treatments.join(', ') }}
      </p>

      <p v-if="record.reasons.length">
        <b class="font-semibold">Reason: </b>
        {{ record.reasons.join(', ') }}
      </p>
      <p v-if="record.teethDislike">
        <b class="font-semibold">Teeth Dislike: </b> {{ record.teethDislike }}
      </p>

      <p v-if="record.smileRate">
        <b class="font-semibold">Smile rating: </b> {{ record.smileRate }}
      </p>
    </section>

    <modal
      classes="bg-white p-0"
      height="auto"
      :scrollable="true"
      name="imageOverlay"
    >
      <img
        :src="imageOverlayImageSource"
        alt="Selfie"
        class="w-full m-0 mx-auto"
      />
    </modal>

    <section class="my-6">
      <h2>Images:</h2>
      <div class="flex h-32 gap-3 overflow-x-auto overflow-y-hidden">
        <img
          class="object-cover h-full rounded-md cursor-pointer"
          alt="Picture"
          v-for="image in images"
          :key="image"
          :src="image"
          @click="openOverlay(image)"
        />
      </div>
    </section>

    <footer>
      <label for="subject" class="flex flex-col my-2">
        Email Subject:
        <input
          v-model="emailSubject"
          class="form-input"
          type="text"
          name="subject"
          id="subject"
        />
      </label>

      <label for="body" class="flex flex-col my-2">
        Email Body:
        <input
          v-model="emailBody"
          class="form-input"
          type="text"
          name="body"
          id="body"
        />
      </label>

      <Mailto
        :mail="record.email"
        :subject="emailSubject"
        title="Write me a email"
        href="mailto:"
        class="w-full h-full py-3 text-base bg-primary btn"
        type="button"
        :body="emailBody"
      >
        Email
      </Mailto>

      <a
        class="w-full py-3 text-base btn bg-primary"
        :href="`tel:+${record.phone}`"
        >Phone</a
      >

      <button
        class="w-full py-3 text-white btn bg-accent"
        type="button"
        @click="answered"
      >
        Mark as answered
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
      imageOverlayImageSource: ''
    }
  },
  methods: {
    openOverlay(imageSrc: string): void {
      this.$modal.show('imageOverlay')
      this.imageOverlayImageSource = imageSrc
    },
    titlize(text: string): string {
      return text.charAt(0).toLocaleUpperCase() + text.slice(1, text.length)
    },
    answered() {
      this.$axios
        .$post(
          '/api/answered',
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
        .then(res => {
          this.$router.push('/admin')
        })
    }
  },
  computed: {
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
