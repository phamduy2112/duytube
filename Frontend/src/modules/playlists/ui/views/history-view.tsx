"use client"
import { useEffect, useState } from "react";
import { HistoryVideosSection } from "../sections/history-video-section";
import { HistorySidebar } from "../sections/history-sidebar-section";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { VideoService } from "@/service/axios/videos/video";

export const HistorygView = () => {
  const [inputValue, setInputValue] = useState(""); // Giá trị đang gõ
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị dùng để lọc sau khi nhấn Enter

  const { user } = useUser();
  const { data: statusSubscription } = useQuery({
    queryKey: ["history", user?.id],
    queryFn: () => VideoService.historyVideo(user.id),
    enabled: !!user?.id,
  });

  const filterHistoryVideos = () => {
    if (!statusSubscription || !Array.isArray(statusSubscription)) return [];

    return statusSubscription.filter((history: any) =>
      history.videos?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="m-auto mb-10 px-4 my-auto flex flex-col gap-y-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-xs text-muted-foreground">
          Videos you have watched
        </p>
      </div>

      <div className="flex justify-between gap-[5rem]">
        <div className="w-[30rem] xl:w-[50rem]">
          <HistoryVideosSection statusSubscription={filterHistoryVideos()} />
        </div>

        <div className="w-[20rem] xl:w-[20rem]">
          <HistorySidebar
            inputValue={inputValue}
            setInputValue={setInputValue}
            onSearch={() => setSearchTerm(inputValue)} // khi nhấn Enter
          />
        </div>
      </div>
    </div>
  );
};
