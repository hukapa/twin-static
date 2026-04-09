// ============================================================
// TWIN-STATIC: Database Types v2
// ============================================================
// Para gerar automaticamente a partir do Supabase:
//   npx supabase gen types typescript --project-id <id> > types/database.ts
// ============================================================

export interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  spotify_product: 'premium' | 'free' | null
  created_at: string
  updated_at: string
}

export interface SpotifyTokens {
  user_id: string
  spotify_user_id: string | null
  access_token: string
  refresh_token: string
  token_expires_at: string
  updated_at: string
}

export interface Space {
  id: string
  name: string
  description: string | null
  spotify_playlist_id: string | null
  created_by: string | null
  created_at: string
}

export interface SpaceMember {
  space_id: string
  user_id: string
  role: 'admin' | 'member'
  joined_at: string
}

export interface Message {
  id: string
  space_id: string
  user_id: string | null          // null se o user apagou a conta
  content: string | null
  media_url: string | null
  media_type: 'image' | 'audio' | null
  reply_to: string | null         // ID de outra mensagem
  created_at: string
}

export interface Note {
  id: string
  space_id: string
  user_id: string | null
  title: string | null
  content: string | null          // Markdown
  tags: string[]
  is_pinned: boolean
  created_at: string
  updated_at: string
}

export interface PlaylistSnapshot {
  id: string
  space_id: string
  snapshot_date: string           // formato YYYY-MM-DD
  track_count: number | null
  tracks: SpotifyTrackSnapshot[] | null
  created_at: string
}

// Sub-type para o conteúdo do jsonb tracks
export interface SpotifyTrackSnapshot {
  id: string
  name: string
  artists: string[]
  album_name: string
  album_image_url: string | null
  added_at: string
  added_by: string | null
  duration_ms: number
}

export interface Event {
  id: string
  space_id: string
  name: string
  description: string | null
  emoji: string
  is_recurring: boolean
  recurring_month: number | null  // 1-12
  recurring_day: number | null    // 1-31
  created_by: string | null
  created_at: string
}

export interface Album {
  id: string
  space_id: string
  name: string
  description: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  space_id: string
  uploaded_by: string | null
  storage_path: string            // ex: "spaces/{space_id}/{media_id}.webp"
  file_type: 'image' | 'video'
  mime_type: string | null
  file_size: number | null        // bytes
  width: number | null
  height: number | null
  blurhash: string | null         // placeholder visual
  caption: string | null
  event_id: string | null
  event_year: number | null
  created_at: string
}

export interface AlbumMedia {
  album_id: string
  media_id: string
  added_at: string
}

// ============================================================
// TIPOS COMPOSTOS (para queries com joins)
// ============================================================

// Mensagem com dados do autor
export interface MessageWithAuthor extends Message {
  profiles: Pick<Profile, 'display_name' | 'avatar_url'> | null
}

// Media com dados do evento (para a galeria)
export interface MediaWithEvent extends Media {
  events: Pick<Event, 'name' | 'emoji'> | null
}

// Álbum com contagem de fotos e thumbnail
export interface AlbumWithPreview extends Album {
  media_count: number
  cover_media: Pick<Media, 'storage_path' | 'blurhash'> | null
}

// Space com contagem de membros
export interface SpaceWithMemberCount extends Space {
  member_count: number
}