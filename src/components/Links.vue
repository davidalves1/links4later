<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { Search } from 'lucide-vue-next';

import LinkItem from './LinkItem.vue';
import Loading from '../components/Loading.vue';
import { useLinkStore } from '../store';
import { getLinks } from '../entities/Link';

const { state } = useLinkStore

const links = computed(() => state.links || [])
const isLoading = computed(() => state.loading || false)

onMounted(() => {
  getLinks();
})
</script>

<template>
  <section class="flex flex-col bg-white p-3 rounded-md gap-3 ">
    <h1 class="text-3xl">Links</h1>

    <template v-if="isLoading">
      <Loading />
    </template>
    <template v-else-if="links?.length">
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
