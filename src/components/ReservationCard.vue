<template>
  <Card>
    <CardHeader class="flex flex-row justify-between">
      <div>
        <CardTitle class="text-xl" v-if="room">{{ room.name }}</CardTitle>
        <CardDescription> {{ timeRange }} on {{ bookingDate }} </CardDescription>
      </div>
      <div class="flex gap-1" v-if="room">
        <slot />
        <Trash2
          class="cursor-pointer text-destructive"
          :size="24"
          @click="emits('deleteReservation', roomId, bookingDate)"
        />
      </div>
    </CardHeader>
    <CardContent>
      <p class="text-right" v-if="room">Total Price: ${{ room.price_per_hour * hours.length }}</p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-vue-next";
import { useRoomsAPI } from "@/composables/rooms";
import { type RoomRow } from "@/types/room";
import { computed, onBeforeMount, ref } from "vue";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(CustomParseFormat);

const emits = defineEmits<{ deleteReservation: [id: string, bookingDate: string] }>();
const props = defineProps<{
  roomId: string;
  hours: number[];
  bookingDate: string;
}>();
const { getRoomById } = useRoomsAPI();
const timeRange = computed(() => {
  if (props.hours.length > 0) {
    const startTime = dayjs(props.hours[0].toString(), "H");
    const endTime = dayjs(props.hours[props.hours.length - 1].toString(), "H");
    return startTime.format("HH:mm") + " - " + endTime.format("HH:mm");
  }
  return "";
});
const room = ref<RoomRow>();

onBeforeMount(async () => {
  room.value = await getRoomById(props.roomId);
});
</script>

<style scoped></style>
