<script setup lang="ts">
import { Edit, Trash } from 'lucide-vue-next';

import { Link } from '../models/Link';
import { computed } from 'vue';
import { deleteLink } from '../entities/Link';

const { link } = defineProps<{
  link: Link
}>()

const createdAt = computed(() => link.createdAt
  ? Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'short' }).format(link.createdAt)
  : ''
);

const onDelete = async (linkId: string) => {
  try {
    await deleteLink(linkId);
  } catch (err) {
    console.log('🚀 ~ onDelete ~ err:', err);
    alert('Sorry, we were unable to perform this task at this time.')
  }
}
</script>

<template>
  <div class="flex justify-between border-b-2 last:border-b-0 pb-3 last:pb-0">
    <div class="w-[85%] text-justify">
      <div class="overflow-hidden text-ellipsis whitespace-nowrap mb-2">
        <a :href="link.url" target="_blank" class="underline text-blue-500 ">{{ link.url }}</a>
      </div>
      <p>{{ link.description }}</p>
      <span v-if="createdAt" class="text-xs italic">Created at {{ createdAt }}</span>
    </div>
    <div id="actions" class="flex gap-x-2 items-start">
      <button>
        <Edit :size="18"/>
      </button>
      <button @click.once="onDelete(link._id)">
        <Trash :size="18"/>
      </button>
    </div>
  </div>
</template>
