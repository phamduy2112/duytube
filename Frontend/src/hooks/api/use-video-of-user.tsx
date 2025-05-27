import { VideoService } from '@/service/axios/videos/video';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useVideoOfUser = (userId: string) => {
  const pageSize = 3;

  return useInfiniteQuery({
    queryKey: ['videos-of-user', userId],
    queryFn: async ({ pageParam = 0 }) => {
      const allVideoOfUsers = await VideoService.getMyVideoUser(userId);
      const videos = allVideoOfUsers.data; // giả định là mảng video đơn giản

      const start = pageParam * pageSize;
      const end = start + pageSize;
      const slicedVideos = videos.slice(start, end);

      return {
        content: slicedVideos, // mảng video cho trang hiện tại
        currentPage: pageParam,
        totalPages: Math.ceil(videos.length / pageSize),
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages - 1) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
