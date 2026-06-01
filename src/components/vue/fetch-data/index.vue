<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
}

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    users.value = await response.json();
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsers);
</script>

<template>
  <div class="fetch-data">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="error">Error: {{ error }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.id">{{ user.name }} — {{ user.email }}</li>
    </ul>
    <button type="button" :disabled="loading" @click="fetchUsers">Refresh</button>
  </div>
</template>
