export interface Comment {
  id: string;
  parent_id?: string | null;
  user_id: string;
  video_id: string;
  value: string;
  created_at: Date;
  updated_at: Date;
  comment_reactions: CommentReaction[];
  comments?: Comment | null;
  other_comments: Comment[];
  users: User;
  videos: Video;
}

export interface Subscription {
  id: string;
  viewer_id: string;
  creator_id: string;
  created_at: Date;
  updated_at: Date;
  users_subscriptions_creator_idTousers: User;
  users_subscriptions_viewer_idTousers: User;
}

export interface User {
  id: string;
  clerk_user_id: string;
  channel_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: Date;
  has_created?: boolean;
  comment_reactions: CommentReaction[];
  comments: Comment[];
  playlists: Playlist[];
  subscriptions_subscriptions_creator_idTousers: Subscription[];
  subscriptions_subscriptions_viewer_idTousers: Subscription[];
  video_history: VideoHistory[];
  video_reactions: VideoReaction[];
  video_views: VideoView[];
  videos: Video[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
  videos: Video[];
}

export interface Video {
  id: string;
  title: string;
  description?: string | null;
  mux_status?: string | null;
  mux_asset_id?: string | null;
  mux_upload_id?: string | null;
  mux_playback_id?: string | null;
  mux_track_id?: string | null;
  mux_track_status?: string | null;
  user_id: string;
  category_id?: string | null;
  created_at?: Date;
  updated_at?: Date;
  comments: Comment[];
  playlist_videos: PlaylistVideo[];
  video_history: VideoHistory[];
  video_reactions: VideoReaction[];
  video_views: VideoView[];
  categories?: Category | null;
  users: User;
}

export interface CommentReaction {
  id: string;
  user_id: string;
  comment_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  comments: Comment;
  users: User;
}

export interface VideoReaction {
  id: string;
  user_id: string;
  video_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  users: User;
  videos: Video;
}

export interface VideoView {
  id: string;
  user_id: string;
  video_id: string;
  created_at: Date;
  updated_at: Date;
  users: User;
  videos: Video;
}

export interface VideoHistory {
  id: string;
  user_id: string;
  video_id: string;
  last_viewed_at: Date;
  updated_at: Date;
  users: User;
  videos: Video;
}

export interface PlaylistVideo {
  id: string;
  playlist_id: string;
  video_id: string;
  order?: number | null;
  added_at?: Date;
  playlists: Playlist;
  videos: Video;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string | null;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  playlist_videos: PlaylistVideo[];
  users: User;
}