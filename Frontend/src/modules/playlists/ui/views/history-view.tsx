"use client";

import { useEffect, useState } from "react";
import {
  HistoryVideosSection,
  HistoryVideosSectionSekeleton,
} from "../sections/history-video-section";
import {
  HistorySidebar,
  HistorySidebarSkeleton,
} from "../sections/history-sidebar-section";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { VideoService } from "@/service/axios/videos/video";

export const HistorygView = () => {
  const [inputValue, setInputValue] = useState(""); // Giá trị đang gõ
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị dùng để lọc sau khi nhấn Enter

  const { user } = useUser();

  const {
    data: statusSubscription,
    isLoading,
  } = useQuery({
    queryKey: ["history", user?.id],
    queryFn: () => VideoService.historyVideo(user!.id),
    enabled: !!user?.id,
  });
const [delayed, setDelayed] = useState(false);

useEffect(() => {
  if (!isLoading) {
    const timeout = setTimeout(() => {
      setDelayed(true);
    }, 1000); // Delay 1 giây sau khi load xong

    return () => clearTimeout(timeout);
  }
}, [isLoading]);
  const hisotryVideo = statusSubscription?.data;

  const filterHistoryVideos = () => {
    if (!hisotryVideo || !Array.isArray(hisotryVideo)) return [];
    return hisotryVideo.filter((history: any) =>
      history.videos?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="m-auto mb-10 px-4 my-auto flex flex-col gap-y-6">
      {isLoading || !delayed ? (
  <div className="h-[50px] w-[200px] bg-gray-200 rounded animate-pulse" />
) : (
  <div>
    <h1 className="text-2xl font-bold">History</h1>
    <p className="text-xs text-muted-foreground">
      Videos you have watched
    </p>
  </div>
)}


      <div className="flex justify-between flex-col-reverse lg:flex-row lg:gap-[5rem]">
        <div className="lg:w-[30rem] xl:w-[50rem]">
          {isLoading || !delayed ? (
  <HistoryVideosSectionSekeleton />
) : Array.isArray(hisotryVideo) && hisotryVideo.length > 0 ? (
  <HistoryVideosSection statusSubscription={filterHistoryVideos()} />
) : (
  <>Chưa có lịch sử video</>
)}

        </div>

        <div className="lg:w-[20rem] xl:w-[20rem]">
          {isLoading || !delayed  ? (
            <HistorySidebarSkeleton />
          ) : (
            <HistorySidebar
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSearch={() => setSearchTerm(inputValue)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
