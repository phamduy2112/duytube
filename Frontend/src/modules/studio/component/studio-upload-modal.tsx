"use client";

import { ResponsiveModal } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VideoService } from "@/service/axios/videos/video";
import { useUser } from "@clerk/nextjs";

interface VideoCreateInput {
  title: string;
  description?: string;
  user_id: string;
  category_id: string;
}

export const StudioUpLoadModal = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (data: VideoCreateInput) =>
      VideoService.createVideosFormUser(data),
    onSuccess: (data) => {
      console.log("✅ Tạo video thành công:", data);
      setUploadUrl(data.upload_url); // Lưu lại upload URL từ Mux
    },
    onError: (error) => {
      console.error("❌ Lỗi tạo video:", error);
    },
  });

  // Gọi API tạo video khi mở modal
  useEffect(() => {
    if (isOpen && user?.id) {
      mutation.mutate({
        title: "Tiêu đề video",
        description: "Mô tả video",
        user_id: user.id,
        category_id: "6bc022ed-bab7-460d-b50c-c7105f390658", // ID danh mục tạm thời
      });
    }
  }, [isOpen, user?.id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadUrl) return;

    setIsUploading(true);

    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (res.ok) {
        console.log("🎉 Upload thành công!");
        setIsOpen(false);
        setUploadUrl(null);
      } else {
        console.error("❌ Upload thất bại:", await res.text());
      }
    } catch (err) {
      console.error("❌ Lỗi khi upload:", err);
    } finally {
      setIsUploading(false);
    }
  };
  console.log(uploadUrl);
  return (
    <>
      <ResponsiveModal title="Upload a video" open={isOpen} onOpenChange={setIsOpen}>
        {uploadUrl ? (
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
              {isUploading ? "Đang tải lên..." : "Chọn video để tải lên"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <Loader2Icon className="animate-spin h-6 w-6" />
          </div>
        )}
      </ResponsiveModal>

      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        {mutation.isPending ? (
          <Loader2Icon className="animate-spin mr-2" />
        ) : (
          <PlusIcon className="mr-2" />
        )}
        Create
      </Button>
    </>
  );
};
