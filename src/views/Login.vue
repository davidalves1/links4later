<script setup lang="ts">
import { ref } from 'vue';
import { doLogin } from '../services/login';

const email = ref('')
const password = ref('')
const error = ref('')

const onSubmit = async () => {
  const user = { email: email.value, password: password.value }
  try {
    await doLogin(user);
  } catch (err) {
    error.value = 'Wrong e-mail or password.';

    setTimeout(() => {
      error.value = ''
    }, 5000)
  }
}
</script>

<template>
  <section class="flex justify-center items-center h-[100vh] w-full bg-zinc-100">
    <form @submit.prevent="onSubmit" class="w-[400px] p-4 flex flex-col border border-zinc-400 bg-white gap-4 rounded-lg shadow-md">
      <h1 class="text-3xl text-center font-thin mb-3">Links4Later</h1>
      <div class="flex flex-col gap-1">
        <label for="email">E-mail</label>
        <input name="email" type="mail" v-model="email" placeholder="my@email.com" class="border border-slate-400 focus:border-slate-600 outline-none rounded-md w-full h-10 px-3 py-2">
      </div>
      <div class="flex flex-col gap-1">
        <label for="password">Password</label>
        <input name="password" type="password" v-model="password" class="border border-slate-400 focus:border-slate-600 outline-none rounded-md w-full h-10 px-3 py-2">
      </div>
      <div class="h-0">
        <span class="fixed text-red-700 text-sm my-auto transition">{{ error }}</span>
      </div>
      <button
        type="submit"
        class="px-3 py-2 mt-2 rounded hover:bg-opacity-90 transition duration-300 flex justify-center bg-cyan-900 text-white"
      >
        Log in
      </button>
    </form>
  </section>
</template>
