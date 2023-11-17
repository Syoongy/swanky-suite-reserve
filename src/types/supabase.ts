export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          hour: number
          room_id: string
          user_id: string
        }
        Insert: {
          booking_date: string
          hour?: number
          room_id: string
          user_id?: string
        }
        Update: {
          booking_date?: string
          hour?: number
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      rooms: {
        Row: {
          end_hour: number
          id: string
          name: string
          price_per_hour: number
          start_hour: number
        }
        Insert: {
          end_hour?: number
          id?: string
          name?: string
          price_per_hour?: number
          start_hour?: number
        }
        Update: {
          end_hour?: number
          id?: string
          name?: string
          price_per_hour?: number
          start_hour?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
