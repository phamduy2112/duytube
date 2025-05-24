export interface IUser {
  id: string;
  clerk_user_id: string;
  channel_name: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: Date;
  has_created?: boolean;
//   comment_reactions: CommentReaction[];
//   comments: Comment[];
//   playlists: Playlist[];
//   subscriptions_subscriptions_creator_idTousers: Subscription[];
//   subscriptions_subscriptions_viewer_idTousers: Subscription[];
//   video_history: VideoHistory[];
//   video_reactions: VideoReaction[];
//   video_views: VideoView[];
//   videos: Video[];
}