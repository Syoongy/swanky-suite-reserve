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
        <NewReservationDialog
          v-model:open="isCreateDialogOpen"
          @add-reservation="handleAddReservation"
        />
      </CardHeader>

      <CardContent class="grid grid-cols-3 gap-2">
        <ReservationCard
          v-for="reservation in reservations"
          :key="reservation.room_id + reservation.booking_date"
          :room-id="reservation.room_id"
          :booking-date="reservation.booking_date"
          :hours="reservation.hours"
        />
      </CardContent>
    </Card>
  </main>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NewReservationDialog from "@/components/NewReservationDialog.vue";
import ReservationCard from "@/components/ReservationCard.vue";
import { useReservationsAPI } from "@/composables/reservations";
import { onBeforeMount, ref } from "vue";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { reservations, addReservation, getReservations } = useReservationsAPI();
const { toast } = useToast();
const { user } = storeToRefs(useAuthStore());
const isCreateDialogOpen = ref(false);

async function handleAddReservation(roomId: string, selectedDate: string, hours: number[]) {
  try {
    if (user.value) {
      await addReservation(
        { room_id: roomId, booking_date: selectedDate, user_id: user.value.id },
        hours
      );
      toast({
        title: "Success",
        description: `New reservation made with on ${selectedDate}`,
        class: "bg-primary"
      });
    }
    isCreateDialogOpen.value = false;
  } catch (error) {
    const err = error as Error;
    toast({ title: err.name, description: err.message, variant: "destructive" });
  }
}

onBeforeMount(async () => {
  if (user.value) {
    getReservations(user.value.id);
  }
});
</script>
