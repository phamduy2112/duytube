import { ICategory } from "./categories.type";

export interface IVideo {
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
//   playlist_videos: PlaylistVideo[];
//   video_history: VideoHistory[];
//   video_reactions: VideoReaction[];
//   video_views: VideoView[];
  categories?: ICategory | null;
//   users: User;
}