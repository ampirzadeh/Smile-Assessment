<template>
  <div class="flex items-center justify-center min-h-screen bg-bgColor">
    <div
      class="max-w-screen-md p-5 mx-6 mt-24 transform -translate-y-1/2 bg-white border border-gray-400 border-solid shadow-md rounded-xl md:mx-2"
    >
      <h1 class="mb-4">Thank you!</h1>
      <p class="leading-relaxed">
        Thank you for your details, which have been received successfully, one
        of our experienced cosmetic dentists will review your smile and get back
        to you for further consultation and your tailored treatment plans and
        costs.
      </p>
      <nuxt-link tag="button" :to="{name: 'index'}" class="w-full mt-6 text-white rounded-full hover:opacity-75 focus:opacity-75 btn bg-accent" title="Start Again">
        Start Over 
      </nuxt-link>
    </div>
  </div>
</template>
