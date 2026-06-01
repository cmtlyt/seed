<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';

const seconds = ref(0);
const running = ref(false);
let interval: ReturnType<typeof setInterval> | null = null;

watch(running, (isRunning) => {
  if (isRunning) {
    interval = setInterval(() => {
      seconds.value++;
    }, 1000);
  } else if (interval) {
    clearInterval(interval);
    interval = null;
  }
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});

function reset() {
  running.value = false;
  seconds.value = 0;
}
</script>

<template>
  <div class="timer">
    <span class="time">{{ seconds }}s</span>
    <button type="button" @click="running = !running">
      {{ running ? 'Pause' : 'Start' }}
    </button>
    <button type="button" @click="reset">Reset</button>
  </div>
</template>
