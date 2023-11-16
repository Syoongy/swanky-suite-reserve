import type { InsertRoom, RoomRow, UpdateRoom } from "@/types/room";
import { reactive, toRefs } from "vue";
import { supabase } from "@/composables/supabase";

const state = reactive({ rooms: Array.from<RoomRow>([]) });

function useRoomsAPI() {
  const { rooms } = toRefs(state);
  async function getRooms() {
    const res = await supabase.from("rooms").select();
    if (res.data) {
      state.rooms = res.data;
    }
  }

  async function addRoom(newRoom: InsertRoom) {
    const { data } = await supabase.from("rooms").insert(newRoom).select();
    if (data) state.rooms.push(data[0]);
  }

  async function editRoom(updateRoom: UpdateRoom, roomId: string) {
    const { data } = await supabase.from("rooms").update(updateRoom).eq("id", roomId).select();
    if (data) state.rooms.push(data[0]);
  }

  return { rooms, getRooms, addRoom, editRoom };
}
export { useRoomsAPI };
