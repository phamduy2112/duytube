import { User } from "@clerk/nextjs/server";
import { PlaylistVideo, VideoHistory, VideoReaction, VideoView } from "./tongHop.type";
import { ICategories } from "./categories.type";

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
  playlist_videos: PlaylistVideo[];
  video_history: VideoHistory[];
  video_reactions: VideoReaction[];
  video_views: IVideoView[];
  categories?: ICategories | null;
  users: User;
}
export interface IVideoView {
  id: string;
  user_id: string;
  video_id: string;
  created_at: Date;
  updated_at: Date;
  users: User;
  videos: IVideo;
}

export interface IVideoReaction {
  id: string;
  user_id: string;
  video_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  users: User;
  videos: IVideo;
}