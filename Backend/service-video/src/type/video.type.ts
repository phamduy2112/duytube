import { ICategory } from '@/service/type/categories.type';
import { IUser } from "./user.type";

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
  playlist_videos: IPlaylistVideo[];
  video_reactions: IVideoReaction[];
  video_views: IVideoView[];
  categories?: ICategory | null;
  users: IUser;
}
export interface IVideoView {
  id: string;
  user_id: string;
  video_id: string;
  created_at: Date;
  updated_at: Date;
  users: IUser;
  videos: IVideo;
}

export interface IVideoReaction {
  id: string;
  user_id: string;
  video_id: string;
  type: string;
  created_at: Date;
  updated_at: Date;
  users: IUser;
  videos: IVideo;
}
export interface IPlaylistVideo {
  id: string;
  playlist_id: string;
  video_id: string;
  order?: number | null;
  added_at?: Date;
  playlists: IPlaylist;
  videos: IVideo;
}

export interface IPlaylist {
  id: string;
  title: string;
  description?: string | null;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  playlist_videos: IPlaylistVideo[];
  users: IUser;
}