<script setup>
import {computed, reactive, ref} from 'vue'
import Routes from '../consts/Routes'
import router from "../router"
import { useStorage } from "vue3-storage"

const storage = useStorage()
storage.setStorageSync("sign", '')
storage.setStorageSync("season", '')
storage.setStorageSync("temperature", '')

const season = ref('')
const sign = ref('')
const temperature = ref('')
let isPropertiesFilled = false

function prepareParamsForAdvice() {
  //console.log('on setParamsForPageAdvice --->', storage)
  if (season.value) storage.setStorageSync("season", season.value)
  else showValidationFrame('seasonFrame')
  if (sign.value || sign.value === '0') storage.setStorageSync("sign", sign.value)
  else showValidationFrame('signFrame')
  if (temperature.value || temperature.value === '0') storage.setStorageSync("temperature", temperature.value)
  else showValidationFrame('temperatureFrame')
  //console.log('--->', season.value, sign.value, temperature.value)
  if (season.value
      && (sign.value || sign.value === '0')
      && (temperature.value || temperature.value === '0')) router.push(Routes.ADVICE)
}

const checkSign = (e) => {
  //console.log('e  ---> ', e.target.value)
  if (e.target) {
    if (e.target.value && e.target.value === '0') {
      temperature.value = '0'
      sign.value = '0'
    }
    else {
      temperature.value = ''
      sign.value = e.target.value
    }
  }
}

const checkTemperature = (e) => {
  //console.log('e  ---> ', e.target.value)
  if (e.target) {
    if (e.target.value && e.target.value !== '0' && sign.value === '0') {
      showValidationFrame('signFrame')
      sign.value = ''
      temperature.value = e.target.value
    }
    else if (e.target.value && e.target.value === '0' && (!sign.value || sign.value !== '0')) {
      temperature.value = e.target.value
      sign.value = '0'
    } else { temperature.value = e.target.value }
  }
}

//в компоненте отрисуется инфо валидации, если text заполнен
const showValidationFrame = (inputFrameId) => {
  console.log('in showValidationFrame---> ', document.getElementById(inputFrameId))
  if (document.getElementById(inputFrameId)) {
    document.getElementById(inputFrameId).classList.add('incorrectInput');
  }
}

//убирать incorrect validation при действиях с компонентами формы
const temperatureInputHandler = () => {
  if (document.getElementById('temperatureFrame')) {
    document.getElementById('temperatureFrame').classList.remove('incorrectInput');
  }
}

const singSelectHandler = () => {
  if (document.getElementById('signFrame')) {
    document.getElementById('signFrame').classList.remove('incorrectInput');
  }
}

const seasonSelectHandler = () => {
  if (document.getElementById('seasonFrame')) {
    document.getElementById('seasonFrame').classList.remove('incorrectInput');
  }
}
const arrImgSrc = [
  "https://img.freepik.com/free-photo/romantic-time-in-the-rain_329181-2028.jpg?w=1060&t=st=1675530709~exp=1675531309~hmac=29961a68cb41ccf5a0297b0e75c60d0dd8cd9ff503de3c163987a151540f65ba",
  "https://img.freepik.com/free-photo/happy-time-despite-bad-weather_329181-2017.jpg?w=996&t=st=1676502091~exp=1676502691~hmac=4bd67a684508b15f153ea2fe66b6552fc03d4f75b74d521a0de513ef829fa2a4",
  "https://img.freepik.com/free-photo/photo-european-man-trembles-from-cold-after-going-skateboarding-crosses-hands-body-tries-warm-himself-wears-grey-winter-jacker-with-fur-hood-gloves-has-frozen-face-covered-by-ice_273609-47043.jpg?w=996&t=st=1676502185~exp=1676502785~hmac=f4ca4c3d47d46906a897ff73f834cb78c950ee2991841e7fd6d9c5b7ed5dcb66",

]
const imgSrc = arrImgSrc[Math.floor(Math.random() * arrImgSrc.length)];


</script>
<template>
  <div>
    <!--
      This component uses @tailwindcss/forms
      yarn add @tailwindcss/forms
      npm install @tailwindcss/forms
      plugins: [require('@tailwindcss/forms')]
    -->
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl text-gray-700">Что надеть?</h1>

          <p class="mt-4 text-gray-500">
            Заполни поля ниже и я подскажу, что надеть в такую погоду =)
          </p>
        </div>

        <div class="mx-auto mt-8 mb-0 max-w-md space-y-4">
          <div class="relative mt-1 -space-y-px bg-white rounded-md shadow-sm">
            <legend class="block text-sm font-medium text-gray-700">
              Выбери время года
            </legend>

            <select
                id="seasonFrame"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 focus:z-10 sm:text-sm shadow-sm"
                v-model="season"
                @change="seasonSelectHandler"
            >
              <option>Осень</option>
              <option>Зима</option>
              <option>Лето</option>
              <option>Весна</option>
            </select>
            <p id="seasonValidMsg"></p>
          </div>
          <div class="relative mt-1 -space-y-px bg-white rounded-md shadow-sm">
            <legend class="block text-sm font-medium text-gray-700">
              Плюс или минус?
            </legend>

            <select
                id="signFrame"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 focus:z-10 sm:text-sm shadow-sm"
                v-model="sign"
                @change="singSelectHandler"
                @input="checkSign"
            >
              <option>+</option>
              <option>-</option>
              <option>0</option>
            </select>
            <p id="signValidMsg"></p>
          </div>
          <div class="relative mt-1 -space-y-px bg-white rounded-md shadow-sm">
            <legend class="block text-sm font-medium text-gray-700">
              Сколько градусов?
            </legend>
            <input
                id="temperatureFrame"
                class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                type="text"
                placeholder="12"
                v-model="temperature"
                @change="temperatureInputHandler"
                @input="checkTemperature"
            />
          </div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-m text-gray-600">
                <RouterLink :to="Routes.REGISTER" class="underline">
                  Зарегистрируйся
                </RouterLink>, чтобы оставлять комментарии или
                <RouterLink :to="Routes.LOGIN" class="underline">
                  войди
                </RouterLink> в существующий аккаунт
              </p>
            </div>

            <button
                class="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                @click="prepareParamsForAdvice"
            >
              Посоветуй, что надеть
            </button>

          </div>
        </div>
      </div>
      <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
            alt="Welcome"
            v-bind:src="imgSrc"
            class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "WeatherFormFilling"
}
</script>

<style scoped>
  .incorrectInput {
    border: 1px solid mediumvioletred;
  }
</style>