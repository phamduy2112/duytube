"use client"

import { InfiniteScroll } from "@/components/infinite-scroll";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { snakeCaseToTitle } from "@/lib/utils";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { mockVideos } from "@/scripts/seed-catelogries"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {format} from "date-fns"
import { Globe2Icon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { useVideoOfUser } from "@/hooks/api/use-video-of-user";
const ITEMS_PER_PAGE = 2;

const VideosSectionSkeleton=()=>{

    return (
        <Table className="w-[800px] lg:w-[1200px] 2xl:w-[1650px]">
                    <TableHeader className="">
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="">Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
        {Array.from({length:5}).map((_,index)=>
          (  <TableRow>
                    <TableCell className="pl-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-20 w-36"></Skeleton>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-[100px]"></Skeleton>
                                <Skeleton className="h-3 w-[100px]"></Skeleton>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-20"></Skeleton>
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-4 w-16"></Skeleton>
                    </TableCell>
                    <TableCell>
                    <Skeleton className="h-4 w-24"></Skeleton>

                    </TableCell>
                    <TableCell className="text-right">
                    <Skeleton className="h-4 w-12 ml-auto"></Skeleton>

                    </TableCell>
                    <TableCell className="text-right">
                    <Skeleton className="h-4 w-12 ml-auto"></Skeleton>

                    </TableCell>
                    <TableCell className="text-right">
                    <Skeleton className="h-4 w-12 ml-auto"></Skeleton>

                    </TableCell>
            </TableRow>)
    )}

</TableBody>

                </Table>
    )
}

export const VideosSection = () => {
  const {user}=useUser()
  console.log(user?.id)
  const {data:VideosOfUser}=useVideoOfUser(user?.id);
  let listVideo=VideosOfUser?.content
    const [page, setPage] = useState(1);
    const [data, setData] = useState(VideosOfUser?.content?.slice(0, ITEMS_PER_PAGE));
    const [isFetching, setIsFetching] = useState(false);
    const hasNextPage = data?.length < VideosOfUser?.content?.length;

    const fetchNextPage = () => {
        if (!hasNextPage) return;

        setIsFetching(true); 
        setTimeout(() => {
            const nextData = mockVideos.slice(0, (page + 1) * ITEMS_PER_PAGE);
            setData(nextData);
            setPage(prev => prev + 1);
            setIsFetching(false);
        }, 1000); // giả lập fetch
    };
    console.log(VideosOfUser?.content) 
    const router=useRouter();
    return (
        <div className="w-full overflow-x-auto">
            <div className="border-y">
                <Table className="w-[1650px]">
                    <TableHeader className="">
                        <TableRow>
                            <TableHead className="pl-6 w-[510px]">Video</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="">Date</TableHead>
                            <TableHead className="text-right">Views</TableHead>
                            <TableHead className="text-right">Comments</TableHead>
                            <TableHead className="text-right pr-6">Likes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
  {VideosOfUser?.content?.map((video) => (
    <TableRow
      onClick={() => router.push(`/studio/videos/${video.id}`)}
      className="cursor-pointer"
      key={video.id}
    >
      {/* Video (title + thumbnail) */}
      <TableCell className="pl-6">
        <div className="flex items-center gap-4">
          <div className="relative aspect-video w-36 shrink-0">
            <VideoThumbnail title={video.title} duration={video.duration || 0} />
          </div>
          <div className="flex flex-col overflow-hidden gap-y-1">
            <span className="text-sm line-clamp-1">{video.title}</span>
            <span className="text-xs text-muted-foreground line-clamp-1">
              {video.description || "No description"}
            </span>
          </div>
        </div>
      </TableCell>

      {/* Visibility */}
      <TableCell>
        <div className="flex items-center">
        {video.visibility==="private"?(
        <LockIcon className="size-4 mr-2"/>
      ):(
        <Globe2Icon className="size-4 mr-2"/>
      )}
      {/* {snakeCaseToTitle(video.visibility)} */}
        
        </div>
       
      </TableCell>

      {/* Status */}
      <TableCell>{snakeCaseToTitle("ready")||"ready"}</TableCell> {/* Bạn có thể sửa chỗ này thành dữ liệu thật */}

      {/* Date */}
      <TableCell>{format(new Date( "2024-01-01"),"d MMM yyyy") || "2024-01-01"}</TableCell>

      {/* Views */}
      <TableCell className="text-right">{video.views}</TableCell>

      {/* Comments */}
      <TableCell className="text-right">{video.comments || 0}</TableCell>

      {/* Likes */}
      <TableCell className="text-right pr-6">{video.likes || 0}</TableCell>
    </TableRow>
  ))}
</TableBody>

                </Table>
            </div>
            <InfiniteScroll
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetching}
                fetchNextPage={fetchNextPage}
                isManual={false} // hoặc true nếu muốn chỉ bấm nút để load
            />

        </div>
    );
}
