<script setup lang="ts">
import { ref } from 'vue';

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
const contents = [
  'This is the content of Tab 1. Vue uses reactive refs and computed.',
  'This is the content of Tab 2. Template syntax with v-for and v-if.',
  'This is the content of Tab 3. Two-way binding with v-model.',
];

const activeIndex = ref(0);
</script>

<template>
  <div class="tabs">
    <div class="tab-headers">
      <button
        v-for="(tab, index) in tabs"
        :key="tab"
        type="button"
        :class="{ active: index === activeIndex }"
        @click="activeIndex = index"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tab-content">
      <p>{{ contents[activeIndex] }}</p>
    </div>
  </div>
</template>
