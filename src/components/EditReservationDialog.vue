<template>
  <Dialog :class="{ dark: isDark }">
    <DialogTrigger as-child>
      <Settings class="cursor-pointer text-muted-foreground" :size="24" />
    </DialogTrigger>
    <DialogContent class="" :class="isDark ? 'dark' : ''">
      <DialogHeader class="grow">
        <DialogTitle>Edit Reservation</DialogTitle>
        <DialogDescription>
          Edits a <span class="text-primary">swanky</span> reservation
        </DialogDescription>
      </DialogHeader>
      <form class="flex flex-col items-center gap-4 text-foreground" @submit.prevent="onSubmit">
        <div class="grid w-full grid-cols-3 gap-2">
          <RoomDisplayCard
            v-for="room in rooms"
            :key="room.id"
            :room="room"
            :class="{ 'border-green-500': isRoomSelected(room.id) }"
            @click="selectRoom(room.id)"
          />
        </div>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              :variant="'outline'"
              :class="cn('justify-start text-left font-normal', !date && 'text-muted-foreground')"
              class="w-full"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              <span>{{ date ? dayjs(date).format("DD/MM/YYYY") : "Pick a date" }}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" :class="{ dark: isDark }">
            <Calendar v-model="date" />
          </PopoverContent>
        </Popover>

        <div class="flex w-96 gap-2 overflow-x-auto p-2">
          <Badge
            class="text-base hover:cursor-pointer"
            :class="[isHourSelected(hour) ? 'bg-primary' : 'bg-secondary-foreground']"
            @click="toggleHour(hour)"
            v-for="hour in 24"
            :key="hour"
          >
            {{ dayjs(hour.toString(), "H").format("HH:mm") }}
          </Badge>
        </div>
        <DialogFooter class="w-full">
          <DialogClose as-child>
            <Button type="submit" class="w-full"> Edit Reservation </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Settings } from "lucide-vue-next";
import { usePreferredDark } from "@vueuse/core";
import { onBeforeMount, ref, watch } from "vue";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import { useRoomsAPI } from "@/composables/rooms";
import RoomDisplayCard from "./RoomDisplayCard.vue";
import type { ReservationRow } from "@/types/reservation";

dayjs.extend(CustomParseFormat);

const isDark = usePreferredDark();
const { rooms, getRooms } = useRoomsAPI();
const date = ref<Date>(new Date());
const emits = defineEmits<{
  editReservation: [roomId: string, selectedDate: string, hours: number[]];
}>();
const props = defineProps<{ reservation: ReservationRow }>();
const selectedHours = ref<number[]>([]);
const selectedRoomId = ref<string>("");

function toggleHour(hour: number) {
  const hourIdx = selectedHours.value.findIndex((val) => val === hour);
  if (hourIdx >= 0) {
    selectedHours.value.splice(hourIdx, 1);
  } else {
    selectedHours.value.push(hour);
  }
}

function selectRoom(id: string) {
  console.log(id);
  selectedRoomId.value = id;
}

function isHourSelected(hour: number) {
  return selectedHours.value.includes(hour);
}

function isRoomSelected(id: string) {
  return selectedRoomId.value === id;
}

function onSubmit() {
  emits(
    "editReservation",
    selectedRoomId.value,
    dayjs(date.value).format("YYYY/MM/DD"),
    selectedHours.value
  );
}

onBeforeMount(async () => {
  await getRooms();
  if (props.reservation) {
    selectedRoomId.value = props.reservation.room_id;
    selectedHours.value = props.reservation.hours;
    date.value = dayjs(props.reservation.booking_date, "YYYY/MM/DD").toDate();
  }
});

watch(props.reservation, (newReservation) => {
  selectedRoomId.value = newReservation.room_id;
  selectedHours.value = newReservation.hours;
  date.value = dayjs(newReservation.booking_date, "YYYY/MM/DD").toDate();
});
</script>

<style scoped></style>
