import { VideoService } from '@/service/axios/videos/video';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useVideoOfUser = (userId: string) => {
  const pageSize = 3;

  return useInfiniteQuery({
    queryKey: ['videos-of-user', userId],
    queryFn: async ({ pageParam = 0 }) => {
      const allVideoOfUsers = await VideoService.getMyVideoUser(userId);
      const start = pageParam * pageSize;
      const end = start + pageSize;
      return {
        content: allVideoOfUsers.data.slice(start, end),
        currentPage: pageParam,
        totalPages: Math.ceil(allVideoOfUsers.data.length / pageSize),
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
