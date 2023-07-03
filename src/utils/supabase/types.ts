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
      Reaction: {
        Row: {
          author: string
          createdAt: string
          likedStatus: string
          wallpaperId: string
        }
        Insert: {
          author: string
          createdAt?: string
          likedStatus: string
          wallpaperId: string
        }
        Update: {
          author?: string
          createdAt?: string
          likedStatus?: string
          wallpaperId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Reaction_wallpaperId_fkey"
            columns: ["wallpaperId"]
            referencedRelation: "Wallpaper"
            referencedColumns: ["id"]
          }
        ]
      }
      Site: {
        Row: {
          author: string | null
          createdAt: string | null
          id: number
          note: string | null
          ownerEmail: string | null
          plan: string | null
          url: string | null
          wallpaperId: string | null
        }
        Insert: {
          author?: string | null
          createdAt?: string | null
          id?: number
          note?: string | null
          ownerEmail?: string | null
          plan?: string | null
          url?: string | null
          wallpaperId?: string | null
        }
        Update: {
          author?: string | null
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
          author: string | null
          createdAt: string | null
          from: string | null
          id: number
          isSolved: boolean | null
          message: string | null
          note: string | null
        }
        Insert: {
          author?: string | null
          createdAt?: string | null
          from?: string | null
          id?: number
          isSolved?: boolean | null
          message?: string | null
          note?: string | null
        }
        Update: {
          author?: string | null
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
          author: string | null
          colorStats: Json | null
          content: string | null
          createdAt: string | null
          id: string
          isPublic: boolean
          keywords: string[] | null
          parent: string | null
          prompt: string | null
          src: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          colorStats?: Json | null
          content?: string | null
          createdAt?: string | null
          id: string
          isPublic?: boolean
          keywords?: string[] | null
          parent?: string | null
          prompt?: string | null
          src?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          colorStats?: Json | null
          content?: string | null
          createdAt?: string | null
          id?: string
          isPublic?: boolean
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

