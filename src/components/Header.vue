<script setup lang="ts">
import { LogOut } from 'lucide-vue-next';

import { doLogout } from '../services/logout';

const onLogout = () => {
  doLogout();
}
</script>

<template>
    <header class="flex justify-between items-center bg-teal-600 px-3 py-4">
        <router-link to="/" class="text-2xl text-white">Links4Later</router-link>
        <router-link @click="onLogout" to="/login" replace class="text-md flex items-center gap-2 text-zinc-600 py-2 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition text-sm">
          <LogOut :size="16" />
          Sign out
        </router-link>
    </header>
</template>
