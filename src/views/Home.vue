<script setup lang="ts">
import Header from '../components/Header.vue';
import NewLinkForm from '../components/NewLinkForm.vue';

</script>

<template>
  <main class="h-[100vh] bg-zinc-100">
    <Header />
    <div class="p-3 flex flex-col gap-2 ">
      <NewLinkForm />
    </div>
  </main>
</template>
