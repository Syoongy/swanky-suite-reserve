<template>
  <main class="flex w-full flex-col gap-2">
    <Card>
      <CardHeader class="flex flex-row justify-between">
        <div>
          <CardTitle>Reservations</CardTitle>
          <CardDescription>
            Manage your <span class="text-primary">swanky</span> reservations here
          </CardDescription>
        </div>
        <!-- <NewRoomDialog v-model:open="isCreateDialogOpen" @add-room="handleAddRoom" /> -->
      </CardHeader>

      <CardContent class="grid grid-cols-3 gap-2">
        <ReservationCard />
      </CardContent>
    </Card>
    The reservation page
    <div class="flex w-full gap-2 overflow-x-auto p-2">
      <Badge class="text-base" v-for="hours in hoursArray" :key="hours">{{ hours }}</Badge>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReservationCard from "@/components/ReservationCard.vue";
import { onBeforeMount, ref } from "vue";
const hoursArray = ref<string[]>([]);

onBeforeMount(() => {
  for (let i = 0; i < 24; i++) {
    const formattedHour = i.toString().padStart(2, "0");
    hoursArray.value.push(`${formattedHour}:00`);
  }
});
</script>
