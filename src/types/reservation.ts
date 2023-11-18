export interface BaseReservation {
  booking_date: string;
  room_id: string;
  user_id: string;
}

export interface ReservationRow extends BaseReservation {
  hour: number;
}

export interface FormattedReservation extends BaseReservation {
  hours: number[];
}

export interface InsertReservation {
  booking_date: string;
  hour?: number;
  room_id: string;
  user_id?: string;
}

export interface UpdateReservation {
  booking_date?: string;
  hour?: number;
  room_id?: string;
  user_id?: string;
}
