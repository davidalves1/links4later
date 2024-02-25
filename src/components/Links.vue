<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Search } from 'lucide-vue-next';

import LinkItem from './LinkItem.vue';
import { Link } from '../models/Link';
import { getState, subscribe } from '../useStore';
import { getLinks } from '../entities/Link';

const links = reactive<Link[]>(getState().links)

subscribe(() => {
  Object.assign(links, { ...getState().links });
})

onMounted(() => {
  getLinks();
})
</script>

<template>
  <section class="flex flex-col bg-white p-3 rounded-md gap-3 ">
    <h1 class="text-3xl">Links</h1>

    <template v-if="links?.length">
      <LinkItem v-for="link in links" :key="link._id" :link="link" />
    </template>
    <template v-else>
      <div class="flex justify-center items-center gap-x-2">
        <Search :size="18"/>
        <h2>No items found</h2>
      </div>
    </template>
  </section>
</template>
