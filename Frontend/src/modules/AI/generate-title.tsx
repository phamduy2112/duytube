"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // from shadcn
import { Button } from "@/components/ui/button";

interface TitleGeneratorProps {
  text: string;
  data: {
    titles: string[];
    tags: string[];
    videoDescription: string;
    ideas: string[];
  } | null;
  loading: boolean;
}

export default function TitleGenerator({ text, data, loading }: TitleGeneratorProps) {
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false); // 👈 để điều khiển dialog

  useEffect(() => {
    if (data?.titles?.length) {
      setSelectedTitle(data.titles[0]);
    }
  }, [data]);

  const handleOpenDialog = () => {
    if (data) {
      setIsOpen(true);
    }
  };

  return (
    <div>
      <Button
        disabled={loading || !text}
        className="bg-blue-600"
        onClick={handleOpenDialog} // 👈 mở dialog khi bấm nút
      >
        {loading ? "Đang tạo nội dung..." : "Tạo nội dung với AI"}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gợi ý nội dung</DialogTitle>
            <DialogDescription>Chọn tiêu đề, mô tả, tag...</DialogDescription>
          </DialogHeader>

          {data && (
            <>
              {/* Tiêu đề */}
              <select
                value={selectedTitle}
                onChange={(e) => setSelectedTitle(e.target.value)}
              >
                {data.titles.map((title, idx) => (
                  <option key={idx} value={title}>
                    {title}
                  </option>
                ))}
              </select>

              {/* Mô tả */}
              <div>{data.videoDescription}</div>

              {/* Tags */}
              <div>
                {data.tags.slice(0, 3).map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
