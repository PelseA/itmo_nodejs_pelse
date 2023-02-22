<script setup lang="ts">
import { inject, ref } from 'vue';
import Routes from '../consts/Routes';
import RegistrationForm from '../components/RegistrationForm.vue';
const pb = inject('pb');
const errors = ref([]);
const isSuccess = ref(false);
const handleRegister = async (data) => {
  console.log('> handleRegister', { ...data });
  errors.value = [];
  console.log('\t pb', pb);
  await pb
      .collection('users')
      .create({
        username: data.name,
        password: data.pwd,
        passwordConfirm: data.pwd,
      })
      .then((result) => {
        console.log('> handleRegister -> result:', result);
        isSuccess.value = true;
      })
      .catch((e) => {
        console.log('> handleRegister -> error:', e.data.data);
        const data = e.data.data;
        errors.value.push(e.toString());
        let item, message;
        for (item in data) {
          message = `${item}: ${data[item].message}`;
          errors.value.push(message);
        }
      });
};
</script>

<template>
  <RegistrationForm
      v-if="!isSuccess"
      title="Registration"
      :errors="errors"
      registration
      @register="handleRegister">
    <RouterLink :to="Routes.LOGIN">
      <small>Login</small>
    </RouterLink>
  </RegistrationForm>
  <div v-else>
    <h1 style="color: lightgreen">User registered successful</h1>
  </div>
</template>

<style scoped></style>