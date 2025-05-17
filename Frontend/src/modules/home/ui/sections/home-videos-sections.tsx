import { InfiniteScroll } from "@/components/infinite-scroll"
import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { VideoService } from "@/service/axios/videos/video"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

interface HomeVideosSectionProps{
    categoryId?:string
}

export const HomeVideoSection=({categoryId}:HomeVideosSectionProps)=>{
 // Giả lập phân trang trên client (nếu API trả về toàn bộ data)
const pageSize = 3;

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['videos'],
  queryFn: async ({ pageParam = 0 }) => {
    const allVideos = await VideoService.getVideo(); // giả sử trả về tất cả
    const start = pageParam * pageSize;
    const end = start + pageSize;
    return {
      content: allVideos.content.slice(start, end),
      currentPage: pageParam,
      totalPages: Math.ceil(allVideos.content.length / pageSize),
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
console.log(data)
    return (
<div className="w-[full] px-4">
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            
            
            ">
  
  {data?.pages.flatMap((page) => page.content).map((video) => (
  <div className="w-[300px]" key={video.id}>
    <VideoGridCard data={video} />
  </div>
))}
  
            </div>
            <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
        </div>
    )
}