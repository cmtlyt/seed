<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="counter">
    <button type="button" @click="count--">-</button>
    <span>{{ count }}</span>
    <button type="button" @click="count++">+</button>
  </div>
</template>
