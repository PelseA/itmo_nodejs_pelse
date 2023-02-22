<script setup>
import { useStorage } from "vue3-storage"

const storage = useStorage()
console.log(storage)

</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <Component :is="Component" />
    </RouterView>
  </div>

</template>

<style scoped>

</style>
