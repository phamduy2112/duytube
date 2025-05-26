"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SaveToPlaylistModal from "./save-to-playlist";
import { useState } from "react";
import CreatePlaylistForm from "./ create-playlist-form";

interface PlaylistCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId:string;
}

export const PlaylistCreateModal = ({
  open,
  onOpenChange,
  videoId
}: PlaylistCreateModalProps) => {
    const [page,setPage]=useState(1);
    const cancel=()=>{
        onOpenChange(false)
        setPage(1)
       
    }
    const modalOpen=()=>{
        onOpenChange(open);
        setPage(1)
    }
   if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="w-[20rem] rounded-xl bg-white p-4">
      {page === 1 ? (
        <SaveToPlaylistModal onClose={cancel} setPage={setPage} videoId={videoId} />
      ) : (
        <CreatePlaylistForm onCancel={cancel} setPage={setPage} videoId={videoId} />
      )}
    </div>
  </div>
);

};
