<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl" v-if="room">{{ room.name }}</CardTitle>
      <CardDescription> {{ timeRange }} on {{ bookingDate }} </CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-right" v-if="room">{{ room.price_per_hour * hours.length }}</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type RoomRow } from "@/types/room";
import { computed, ref } from "vue";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(CustomParseFormat);

const { roomId, hours, bookingDate } = defineProps<{
  roomId: string;
  hours: number[];
  bookingDate: string;
}>();
const timeRange = computed(() => {
  if (hours.length > 0) {
    const startTime = dayjs(hours[0].toString(), "H");
    const endTime = dayjs(hours[hours.length - 1].toString(), "H");
    return startTime.format("HH:mm") + " - " + endTime.format("HH:mm");
  }
  return "";
});
const room = ref<RoomRow>();
</script>

<style scoped></style>
