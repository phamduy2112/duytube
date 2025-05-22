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
    console.log(videoId)
  return (
    <Dialog open={open} onOpenChange={modalOpen}>
    
        {
            page==1 ?
            <DialogContent className="p-0 h-[400px] w-[20rem] overflow-y-auto rounded-xl">
            <SaveToPlaylistModal onClose={() => cancel()} setPage={setPage} videoId={videoId}/>

            </DialogContent>
           
            :<DialogContent className="w-[20rem]">
                <CreatePlaylistForm onCancel={()=>cancel()} setPage={setPage} videoId={videoId} />
            </DialogContent>
        }
    
    </Dialog>
  );
};
