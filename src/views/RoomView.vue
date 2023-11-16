<template>
  <main class="flex w-full flex-col gap-2">
    <Card class="grow">
      <CardHeader class="flex flex-row justify-between">
        <div>
          <CardTitle>Rooms</CardTitle>
          <CardDescription>Manage your rooms all in one place</CardDescription>
        </div>
        <NewRoomDialog v-model:open="isCreateDialogOpen" @add-room="handleAddRoom" />
      </CardHeader>
      <CardContent class="grid gap-2">
        <div class="grid grid-cols-12 gap-2 rounded-lg border px-4 py-1 font-semibold">
          <p class="col-span-3">Room ID</p>
          <p class="col-span-3">Name</p>
          <p class="col-span-1">Start Hour</p>
          <p class="col-span-1">End Hour</p>
          <p class="col-span-2">Price Per Hour</p>
        </div>
        <div
          class="grid grid-cols-12 items-center justify-center gap-2 rounded-lg border px-4 py-1"
          v-for="room in rooms"
          :key="room.id"
          v-auto-animate
        >
          <p class="col-span-3">
            {{ room.id }}
          </p>
          <p class="col-span-3">
            {{ room.name }}
          </p>
          <p class="col-span-1">
            {{ room.start_hour }}
          </p>
          <p class="col-span-1">
            {{ room.end_hour }}
          </p>
          <p class="col-span-2">
            {{ room.price_per_hour }}
          </p>
          <div class="col-span-2 flex justify-end">
            <Trash2 class="cursor-pointer text-destructive" :size="32" />
          </div>
        </div>
      </CardContent>
    </Card>
  </main>
</template>
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast/use-toast";
import { Trash2 } from "lucide-vue-next";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useRoomsAPI } from "@/composables/rooms";
import { onBeforeMount, ref } from "vue";
import NewRoomDialog from "@/components/NewRoomDialog.vue";
import type { InsertRoom } from "@/types/room";
const { rooms, getRooms, editRoom, addRoom } = useRoomsAPI();
const { toast } = useToast();

const isCreateDialogOpen = ref(false);

async function handleAddRoom(newRoom: InsertRoom) {
  try {
    const res = await addRoom(newRoom);
    if (res) {
      toast({ title: "Success", description: `New room with ID: ${res.id}` });
    }
    isCreateDialogOpen.value = false;
  } catch (error) {
    const err = error as Error;
    toast({ title: err.name, description: err.message });
  }
}
onBeforeMount(async () => {
  await getRooms();
});
</script>
