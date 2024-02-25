<script setup lang="ts">
import Header from '../components/Header.vue';
import NewLinkForm from '../components/NewLinkForm.vue';
import Links from '../components/Links.vue';

</script>

<template>
  <main class="min-h-[100vh] bg-zinc-100 flex flex-col">
    <Header />
    <div class="p-3 flex flex-col gap-y-4 md:w-2/3 lg:w-1/2 md:mx-auto flex-1">
      <NewLinkForm />
      <Links />
    </div>
    <footer class="text-center text-zinc-300">
      <a href="https://www.linkedin.com/in/davidalves1/" target="_blank">Made by davidalves1</a>
    </footer>
  </main>
</template>
