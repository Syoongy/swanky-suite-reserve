import type { ReservationRow, UpdateReservation, InsertReservation } from "@/types/reservation";
import { reactive, toRefs } from "vue";
import { supabase } from "@/composables/supabase";

const state = reactive({ reservations: Array.from<ReservationRow>([]) });

function useReservationsAPI() {
  const { reservations } = toRefs(state);

  async function getReservations(userId: string) {
    const res = await supabase.from("reservations").select().eq("user_id", userId);
    if (res.data) {
      for (const reservation of res.data) {
        reservation.hours.sort();
      }
      state.reservations = res.data;
    }
  }

  async function addReservation(newReservation: InsertReservation) {
    const { data } = await supabase.from("reservations").insert(newReservation).select();
    if (data) {
      state.reservations.push(data[0]);
    }
  }

  async function editReservation(
    updateReservation: UpdateReservation,
    oldBookingDate: string,
    oldRoomId: string,
    userId: string
  ) {
    const { data } = await supabase
      .from("reservations")
      .update(updateReservation)
      .eq("room_id", oldRoomId)
      .eq("user_id", userId)
      .eq("booking_date", oldBookingDate)
      .select();
    if (data) {
      const idx = reservations.value.findIndex(
        (val) => val.room_id === oldRoomId && val.booking_date === oldBookingDate
      );
      data[0].hours.sort();
      state.reservations[idx] = data[0];
    }
  }

  async function deleteReservation(roomId: string, bookingDate: string, userId: string) {
    await supabase
      .from("reservations")
      .delete()
      .eq("room_id", roomId)
      .eq("user_id", userId)
      .eq("booking_date", bookingDate);
    state.reservations = state.reservations.filter(
      (val) => !(val.room_id === roomId && val.booking_date === bookingDate)
    );
  }

  return { reservations, getReservations, addReservation, editReservation, deleteReservation };
}
export { useReservationsAPI };
