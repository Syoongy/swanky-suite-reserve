import type {
  ReservationRow,
  UpdateReservation,
  InsertReservation,
  BaseReservation,
  FormattedReservation
} from "@/types/reservation";
import { reactive, toRefs } from "vue";
import { supabase } from "@/composables/supabase";

const state = reactive({ reservations: Array.from<FormattedReservation>([]) });

function useReservationsAPI() {
  const { reservations } = toRefs(state);

  async function getReservations(userId: string) {
    const res = await supabase.from("bookings").select().eq("user_id", userId);
    if (res.data) {
      state.reservations = res.data.reduce(
        (formattedArray: FormattedReservation[], reservationRow: ReservationRow) => {
          // Check if there is already a FormattedReservation for the given room and user
          const existingFormattedReservation = formattedArray.find(
            (formattedReservation) =>
              formattedReservation.room_id === reservationRow.room_id &&
              formattedReservation.user_id === reservationRow.user_id &&
              formattedReservation.booking_date === reservationRow.booking_date
          );

          if (existingFormattedReservation) {
            // If found, add the hour to the existing FormattedReservation
            existingFormattedReservation.hours.push(reservationRow.hour);
          } else {
            // If not found, create a new FormattedReservation with the current ReservationRow
            const newFormattedReservation: FormattedReservation = {
              booking_date: reservationRow.booking_date,
              room_id: reservationRow.room_id,
              user_id: reservationRow.user_id,
              hours: [reservationRow.hour]
            };

            // Add the new FormattedReservation to the array
            formattedArray.push(newFormattedReservation);
          }

          return formattedArray;
        },
        []
      );
    }
  }

  async function addReservation(newReservation: BaseReservation, hours: number[]) {
    const reservationItems: InsertReservation[] = [];
    for (const hour of hours) {
      reservationItems.push({ ...newReservation, hour });
    }
    const { data } = await supabase.from("bookings").insert(reservationItems).select();
    if (data) {
      // state.reservations = [...state.reservations, ...data];
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
