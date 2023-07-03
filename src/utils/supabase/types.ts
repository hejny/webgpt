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
      Site: {
        Row: {
          createdAt: string | null
          id: number
          note: string | null
          ownerEmail: string | null
          plan: string | null
          url: string | null
          wallpaperId: string | null
        }
        Insert: {
          createdAt?: string | null
          id?: number
          note?: string | null
          ownerEmail?: string | null
          plan?: string | null
          url?: string | null
          wallpaperId?: string | null
        }
        Update: {
          createdAt?: string | null
          id?: number
          note?: string | null
          ownerEmail?: string | null
          plan?: string | null
          url?: string | null
          wallpaperId?: string | null
        }
        Relationships: []
      }
      SupportRequest: {
        Row: {
          createdAt: string | null
          from: string | null
          id: number
          isSolved: boolean | null
          message: string | null
          note: string | null
        }
        Insert: {
          createdAt?: string | null
          from?: string | null
          id?: number
          isSolved?: boolean | null
          message?: string | null
          note?: string | null
        }
        Update: {
          createdAt?: string | null
          from?: string | null
          id?: number
          isSolved?: boolean | null
          message?: string | null
          note?: string | null
        }
        Relationships: []
      }
      Wallpaper: {
        Row: {
          colorStats: Json | null
          content: string | null
          createdAt: string | null
          id: string
          keywords: string[] | null
          parent: string | null
          prompt: string | null
          src: string | null
          title: string | null
        }
        Insert: {
          colorStats?: Json | null
          content?: string | null
          createdAt?: string | null
          id: string
          keywords?: string[] | null
          parent?: string | null
          prompt?: string | null
          src?: string | null
          title?: string | null
        }
        Update: {
          colorStats?: Json | null
          content?: string | null
          createdAt?: string | null
          id?: string
          keywords?: string[] | null
          parent?: string | null
          prompt?: string | null
          src?: string | null
          title?: string | null
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

