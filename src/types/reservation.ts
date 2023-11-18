export interface ReservationRow {
  booking_date: string;
  hours: number[];
  room_id: string;
  user_id: string;
}

export interface InsertReservation {
  booking_date: string;
  hours: number[];
  room_id: string;
  user_id: string;
}

export interface UpdateReservation {
  booking_date?: string;
  hours?: number[];
  room_id?: string;
  user_id?: string;
}
