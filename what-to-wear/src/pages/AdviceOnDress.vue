<script setup>
import apolloClient from "../graphql/apollo.js"
import { ref, computed } from "vue"
import { useStorage } from "vue3-storage"
import { useQuery, provideApolloClient, useResult } from "@vue/apollo-composable"
import { QueryStringBuilder } from "../utils/QueryStringBuilder.js"
import gql from "graphql-tag"
import Routes from '../consts/Routes';

provideApolloClient(apolloClient)
let contentForAdvice = ref([])
const storage = useStorage()
const signValue = storage.hasKey("sign") ? storage.getStorageSync("sign") : ''
console.log('signValue --->', signValue)
const seasonValue = storage.hasKey("season") ? storage.getStorageSync("season") : ''
console.log('seasonValue --->', seasonValue)
const temperatureValue = storage.hasKey("temperature") ? storage.getStorageSync("temperature") : ''
console.log('temperatureValue --->', temperatureValue)
let customBG = '';
if (/лето/i.test(seasonValue)) customBG = 'custom-bg-summer';
if (/осен/i.test(seasonValue)) customBG = 'custom-bg-autumn';
if (/зима/i.test(seasonValue)) customBG = 'custom-bg-winter';
if (/весна/i.test(seasonValue)) customBG = 'custom-bg-spring';

const queryStringBuilder =  new QueryStringBuilder()
queryStringBuilder.setSeason(seasonValue)
queryStringBuilder.setSign(signValue)
queryStringBuilder.setTemperature(temperatureValue)
const dbName = queryStringBuilder.getDbName(seasonValue)

const queryString = queryStringBuilder.getQueryString()
console.log('queryString ---> ', queryString)

if (queryString) {
  const { result } = useQuery(gql`${queryString}`)
  console.log('result from useQuery ', {result})
  contentForAdvice = computed(() => (result.value && result.value[dbName]) || [])
  console.log('contentForAdvice contentForAdvice --- ', contentForAdvice)
} else {

}

</script>

<template class="custom-bg">
  <div v-bind:class="customBG">
    <div v-if="contentForAdvice && contentForAdvice[0]" class="flex justify-between items-center px-16 text-gray-900 bg-purple-800">
      <div
          v-for="advice in contentForAdvice"
          class="flex justify-between border-4 border-gray-900">
        <div class="custom-width-50">
          <div class="p-4">
            <img
                class="object-cover border-2 border-rose-600"
                v-bind:src="advice.lady_img "
                alt="Одетый по погоде человек"
            >
          </div>
          <div class="p-4 border-4 border-gray-900">
            <h2 class="text-4xl border-4 border-gray-900">В такую погоду</h2>
            <p class="text-base text-gray-800 leading-normal border-4 border-gray-900">
              {{ advice.lady_text }}
            </p>
          </div>
        </div>
        <div class="custom-width-50">
          <div class="p-4">
            <img
                class="object-cover"
                v-bind:src="advice.man_img"
                alt="Одетый по погоде человек"
            >
          </div>
          <div class="p-4">
            <h2 class="text-4xl">В такую погоду</h2>
            <p class="text-base text-gray-800 leading-normal">
              {{ advice.man_text }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-between items-center px-16 text-gray-900 bg-purple-800">
      <div class="flex justify-between border-4 border-gray-900">
        <div class="border-4 border-gray-900">
          <div class="p-4">
            <img
                class="object-cover border-2 border-rose-600"
                src="https://previews.123rf.com/images/ratoca/ratoca1507/ratoca150700342/43049492-one-moment-please-comment.jpg"
                alt="Подождите"
            >
          </div>
          <div class="p-4 border-4 border-gray-900">
            <h2 class="text-4xl border-4 border-gray-900">В такую погоду</h2>
            <p class="text-base text-gray-800 leading-normal border-4 border-gray-900">
              ...
            </p>
          </div>
        </div>
        <div>
          <div class="p-4">
            <img
                class="object-cover"
                src="https://previews.123rf.com/images/ratoca/ratoca1507/ratoca150700342/43049492-one-moment-please-comment.jpg"
                alt="Подождите"
            >
          </div>
          <div class="p-4">
            <h2 class="text-4xl">В такую погоду</h2>
            <p class="text-base text-gray-800 leading-normal">
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
    <RouterLink :to="Routes.INDEX">
      <button
          class="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
      >
        Другая погода
      </button>
    </RouterLink>
  </div>

</template>

<style scoped>
.custom-width-50 {
  width: 50%;
}
.custom-bg-summer {
  background-image: linear-gradient( 109.6deg, rgba(156,252,248,1) 11.2%, rgba(110,123,251,1) 91.1% );
}
.custom-bg-spring {
  background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
}
.custom-bg-winter {
  background-image: linear-gradient(to right, #fc5c7d, #6a82fb);
}
.custom-bg-autumn {
  background-image: linear-gradient(to right, #00b09b, #96c93d);
}
img {
  border-radius: 1em;
}
</style>
