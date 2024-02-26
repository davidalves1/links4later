<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Search } from 'lucide-vue-next';

import LinkItem from './LinkItem.vue';
// import { Link } from '../models/Link';
import { useLinkStore } from '../store';
import { getLinks } from '../entities/Link';

const { state } = useLinkStore

const links = computed(() => state.links || [])

onMounted(() => {
  getLinks();
})
</script>

<template>
  <section class="flex flex-col bg-white p-3 rounded-md gap-3 ">
    <h1 class="text-3xl">Links</h1>

    <template v-if="links?.length">
      <LinkItem v-for="(link, key) in links" :key="key" :link="link" />
    </template>
    <template v-else>
      <div class="flex justify-center items-center gap-x-2">
        <Search :size="18"/>
        <h2>No items found</h2>
      </div>
    </template>
  </section>
</template>
