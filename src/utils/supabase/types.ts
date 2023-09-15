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
      Client: {
        Row: {
          clientId: string
          email: string | null
          emailPreferences: Json | null
        }
        Insert: {
          clientId: string
          email?: string | null
          emailPreferences?: Json | null
        }
        Update: {
          clientId?: string
          email?: string | null
          emailPreferences?: Json | null
        }
        Relationships: []
      }
      Prompt: {
        Row: {
          answer: string | null
          answerAt: string | null
          clientId: string | null
          createdAt: string
          id: number
          metadata: Json | null
          model: string | null
          modelSettings: Json | null
          previousId: number | null
          prompt: string | null
          promptAt: string | null
          systemMessage: string | null
        }
        Insert: {
          answer?: string | null
          answerAt?: string | null
          clientId?: string | null
          createdAt?: string
          id?: number
          metadata?: Json | null
          model?: string | null
          modelSettings?: Json | null
          previousId?: number | null
          prompt?: string | null
          promptAt?: string | null
          systemMessage?: string | null
        }
        Update: {
          answer?: string | null
          answerAt?: string | null
          clientId?: string | null
          createdAt?: string
          id?: number
          metadata?: Json | null
          model?: string | null
          modelSettings?: Json | null
          previousId?: number | null
          prompt?: string | null
          promptAt?: string | null
          systemMessage?: string | null
        }
        Relationships: []
      }
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
          },
          {
            foreignKeyName: "Reaction_wallpaperId_fkey"
            columns: ["wallpaperId"]
            referencedRelation: "Wallpaper_random"
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
          author: string
          colorStats: Json | null
          content: string
          createdAt: string
          id: string
          isPublic: boolean
          keywords: string[] | null
          naturalSize: Json | null
          parent: string | null
          prompt: string | null
          src: string
          title: string
        }
        Insert: {
          author: string
          colorStats?: Json | null
          content: string
          createdAt?: string
          id: string
          isPublic?: boolean
          keywords?: string[] | null
          naturalSize?: Json | null
          parent?: string | null
          prompt?: string | null
          src: string
          title: string
        }
        Update: {
          author?: string
          colorStats?: Json | null
          content?: string
          createdAt?: string
          id?: string
          isPublic?: boolean
          keywords?: string[] | null
          naturalSize?: Json | null
          parent?: string | null
          prompt?: string | null
          src?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      Wallpaper_random: {
        Row: {
          author: string | null
          colorStats: Json | null
          content: string | null
          createdAt: string | null
          id: string | null
          isPublic: boolean | null
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
          id?: string | null
          isPublic?: boolean | null
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
          id?: string | null
          isPublic?: boolean | null
          keywords?: string[] | null
          parent?: string | null
          prompt?: string | null
          src?: string | null
          title?: string | null
        }
        Relationships: []
      }
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

