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
//console.log('signValue --->', signValue)
const seasonValue = storage.hasKey("season") ? storage.getStorageSync("season") : ''
//console.log('seasonValue --->', seasonValue)
const temperatureValue = storage.hasKey("temperature") ? storage.getStorageSync("temperature") : ''
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

if (queryString) {
  const { result } = useQuery(gql`${queryString}`)
  contentForAdvice = computed(() => (result.value && result.value[dbName]) || [])
  //console.log('contentForAdvice contentForAdvice --- ', contentForAdvice)
} else {

}

</script>

<template>
  <RouterLink :to="Routes.INDEX">
    <button class="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
      Другая погода
    </button>
  </RouterLink>
  <div >
    <div v-if="contentForAdvice && contentForAdvice[0]"
         v-bind:class="customBG"
         class="relative flex flex-wrap lg:h-screen lg:items-center"
         >
      <div v-for="advice in contentForAdvice"
           class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24"
           >
        <div class="mx-auto max-w-lg text-center">
          <img
              class=""
              v-bind:src="advice.lady_img "
              alt="Одетый по погоде человек">

          <h2 class="text-2xl">В такую погоду</h2>
          <p class="">
            {{ advice.lady_text }}
          </p>
        </div>
        <div class="mx-auto max-w-lg text-center">
          <img
              class=""
              v-bind:src="advice.man_img"
              alt="Одетый по погоде человек">
          <h2 class="text-2xl">В такую погоду</h2>
          <p class="l">
            {{ advice.man_text }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="">
      <div class="">
        <div class="">
          <div class="p-2">
            <img
                class=""
                src="https://previews.123rf.com/images/ratoca/ratoca1507/ratoca150700342/43049492-one-moment-please-comment.jpg"
                alt="Подождите"
            >
          </div>
          <div class="p-2">
            <h2 class="text-2xl">В такую погоду</h2>
            <p class="">
              ...
            </p>
          </div>
        </div>
        <div class="">
          <div class="p-2">
            <img
                class=""
                src="https://previews.123rf.com/images/ratoca/ratoca1507/ratoca150700342/43049492-one-moment-please-comment.jpg"
                alt="Подождите"
            >
          </div>
          <div class="p-2">
            <h2 class="text-2xl">В такую погоду</h2>
            <p class="text-base text-gray-800 leading-normal">
              ...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
