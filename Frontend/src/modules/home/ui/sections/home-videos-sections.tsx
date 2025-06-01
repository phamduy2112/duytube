import { InfiniteScroll } from "@/components/infinite-scroll"
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { VideoService } from "@/service/axios/videos/video"
import { IVideo } from "@/service/type/video.type"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

interface HomeVideosSectionProps{
    categoryId:string|null,
}

export const HomeVideoSection=({categoryId}:HomeVideosSectionProps)=>{
 // Giả lập phân trang trên client (nếu API trả về toàn bộ data)
const pageSize = 3;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['videos', categoryId],
    queryFn: async ({ pageParam = 0 }) => {
      const allVideos = await VideoService.getVideo(); // giả sử trả về tất cả

      // Lọc nếu có categoryId
      const filtered = categoryId
        ? allVideos.data.filter((v:any) => v.categoryId === categoryId)
        : allVideos.data;

      const start = pageParam * pageSize;
      const end = start + pageSize;

      return {
        content: filtered.slice(start, end), // sửa ở đây
        currentPage: pageParam,
        totalPages: Math.ceil(filtered.length / pageSize), // sửa ở đây
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages - 1) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });


const skeletonCount = 6; // số lượng skeleton hiển thị khi load

    return (
<div className="w-[full] px-4">
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px):grid-cols-6]
            ">
  {
    isLoading ? Array(skeletonCount).fill(0).map((_, idx) => (
            <div className="w-[300px]" key={idx}>
              <VideoGridCardSkeleton />
            </div>
          )) : data?.pages.flatMap((page) => page.content).map((video:any) => (
  <div className="w-[300px]" key={video.id}>
    <VideoGridCard data={video} />
  </div>
))
  }
  
  
            </div>
            <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
        </div>
    )
}