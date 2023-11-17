import type { ReservationRow, UpdateReservation, InsertReservation } from "@/types/reservation";
import { reactive, toRefs } from "vue";
import { supabase } from "@/composables/supabase";

const state = reactive({ reservations: Array.from<ReservationRow>([]) });

function useReservationsAPI() {
  const { reservations } = toRefs(state);
  async function getReservations(userId: string) {
    const res = await supabase.from("bookings").select().eq("user_id", userId);
    if (res.data) {
      state.reservations = res.data;
    }
  }

  async function addReservation(newReservation: InsertReservation) {
    const { data } = await supabase.from("bookings").insert(newReservation).select();
    if (data) {
      state.reservations.push(data[0]);
      return data[0];
    }
  }

  async function editReservation(updateRoom: UpdateReservation, roomId: string) {
    // const { data } = await supabase.from("bookings").update(updateRoom).eq("id", roomId).select();
    // if (data) {
    //   const roomIdx = rooms.value.findIndex((val) => val.id === roomId);
    //   state.rooms[roomIdx] = data[0];
    // }
  }

  async function deleteReservation(id: string) {
    // await supabase.from("bookings").delete().eq("id", id);
    // rooms.value = rooms.value.filter((val) => val.id !== id);
  }

  return { reservations, getReservations, addReservation, editReservation, deleteReservation };
}
export { useReservationsAPI };
