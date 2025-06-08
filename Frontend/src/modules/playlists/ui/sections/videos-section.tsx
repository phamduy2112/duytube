"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { PlaylistsService } from "@/service/axios/playlists/playlists.service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type DeletePlaylistParams = {
    playlist_id: string;
   
  };
  
//  co sus
const VideosSectionSekeleton=()=>{
    return     <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {Array.from({length:18}).map((_,index)=>(
                <VideoGridCardSkeleton key={index} />
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {Array.from({length:18}).map((_,index)=>(
                <VideoRowCardSkeleton key={index}  size="compact"/>
            ))}
            </div>
          
        </div>
}
export const VideosSection = ({ playlistId }: any) => {
    const queryClient = useQueryClient();
  
   
const { mutate: deletePlaylist } = useMutation({
    mutationFn: ({ playlist_id }: DeletePlaylistParams) => 
      PlaylistsService.deletePlaylists(playlist_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist-detail', playlistId] });
    },
  });
  
    const handleDeletePlaylist = (id: string) => {
      deletePlaylist({playlist_id:playlistId});
    };
  
    const { data: playlistDetail, isLoading } = useQuery({
      queryKey: ["playlist-detail", playlistId],
      queryFn: () => PlaylistsService.getDetailPlaylists(playlistId),
      enabled: !!playlistId,
    });
  
    if (isLoading) {
      return <VideosSectionSekeleton />;
    }
  
    return (
      <div>
        <div className="flex flex-col gap-4 gap-y-10 md:hidden">
          {playlistDetail?.data?.playlist_videos?.map((video: any) => (
            <VideoGridCard key={video.id} data={video?.videos} onRemove={handleDeletePlaylist}/>
          ))}
        </div>
        <div className="hidden flex-col gap-4 gap-y-10 md:flex">
          {playlistDetail?.data?.playlist_videos.map((video: any) => (
            <VideoRowCard key={video.id} data={video?.videos} size="default" onRemove={handleDeletePlaylist}/>
          ))}
        </div>
      </div>
    );
  };
  