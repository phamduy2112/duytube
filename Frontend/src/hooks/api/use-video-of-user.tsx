// hooks/usePlaylistDetail.ts
import { VideoService } from '@/service/axios/videos/video';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useVideoOfUser  = (userId: string) => {
    console.log(userId)
  return useQuery({
    queryKey: ['videos-of-user', userId],
    queryFn:  () => VideoService.getMyVideoUser(userId),
    enabled: !!userId, // chỉ gọi khi có playlistId
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });
};
