<script setup lang="ts">
import { ref } from 'vue';
import { createLink } from '../entities/Link';

const url = ref('')
const description = ref('')

const onSubmit = async () => {
  try {
    const link = { url: url.value, description: description.value };
    await createLink(link);

    url.value = '';
    description.value = '';
  } catch(err) {
    console.error('🚀 ~ onSubmit ~ create:', err);
    alert('Sorry, we were unable to perform this task at this time.')
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col bg-white p-3 rounded-md gap-3">
    <div class="flex flex-col gap-1">
      <label for="url">Url</label>
      <input name="url" type="url" v-model="url" class="border border-slate-400 focus:border-slate-600 outline-none rounded-md w-full h-10 px-3 py-2">
    </div>
    <div class="flex flex-col gap-1">
      <label for="description">Description</label>
      <input name="description" type="text" v-model="description" class="border border-slate-400 focus:border-slate-600 outline-none rounded-md w-full h-10 px-3 py-2">
    </div>
    <button
      type="submit"
      class="px-3 py-2 rounded hover:bg-opacity-90 transition duration-300 flex justify-center bg-cyan-900 text-white self-end min-w-24 disabled:bg-slate-300 disabled:text-white disabled:border-none"
      :disabled="!url"
    >
      Add link
    </button>
  </form>
</template>
