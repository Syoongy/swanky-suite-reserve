export interface RoomRow {
  end_hour: number;
  id: string;
  name: string;
  price_per_hour: number;
  start_hour: number;
}

export interface InsertRoom {
  end_hour?: number;
  id?: string;
  name?: string;
  price_per_hour?: number;
  start_hour?: number;
}


export interface UpdateRoom {
    end_hour?: number;
    name?: string;
    price_per_hour?: number;
    start_hour?: number;
  }