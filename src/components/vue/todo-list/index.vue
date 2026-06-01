<script setup lang="ts">
import { ref } from 'vue';

const items = ref<string[]>([]);
const input = ref('');

function addItem() {
  if (!input.value.trim()) {
    return;
  }
  items.value.push(input.value.trim());
  input.value = '';
}

function removeItem(index: number) {
  items.value.splice(index, 1);
}
</script>

<template>
  <div class="todo-list">
    <div class="todo-input">
      <input v-model="input" type="text" placeholder="Add a todo..." @keydown.enter="addItem" />
      <button type="button" @click="addItem">Add</button>
    </div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item }}</span>
        <button type="button" @click="removeItem(index)">×</button>
      </li>
    </ul>
    <p v-if="items.length === 0">No items yet</p>
  </div>
</template>
