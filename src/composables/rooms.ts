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
    if (data) {
      state.rooms.push(data[0]);
      return data[0];
    }
  }

  async function editRoom(updateRoom: UpdateRoom, roomId: string) {
    const { data } = await supabase.from("rooms").update(updateRoom).eq("id", roomId).select();
    if (data) {
      const roomIdx = rooms.value.findIndex((val) => val.id === roomId);
      state.rooms[roomIdx] = data[0];
    }
  }

  async function deleteRoom(id: string) {
    await supabase.from("rooms").delete().eq("id", id);
    rooms.value = rooms.value.filter((val) => val.id !== id);
  }

  return { rooms, getRooms, addRoom, editRoom, deleteRoom };
}
export { useRoomsAPI };
