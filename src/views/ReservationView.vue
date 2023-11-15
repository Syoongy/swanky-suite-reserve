<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { onBeforeMount, ref } from "vue";
const hoursArray = ref<string[]>([]);

onBeforeMount(() => {
  for (let i = 0; i < 24; i++) {
    const formattedHour = i.toString().padStart(2, "0");
    hoursArray.value.push(`${formattedHour}:00`);
  }
});
</script>

<template>
  <main class="flex w-full flex-col items-center justify-center">
    The reservation page
    <div class="flex gap-2 overflow-x-auto w-full p-2">
      <Badge class="text-base" v-for="hours in hoursArray" :key="hours">{{ hours }}</Badge>
    </div>
  </main>
</template>
