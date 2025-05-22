'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaylistCreateModal } from '@/modules/playlists/ui/components/playlist-create-modal';
import {
  ListPlusIcon,
  MoreVerticalIcon,
  ShareIcon,
  Trash2Icon,
} from 'lucide-react';
import React, { useState } from 'react';

interface VideoMenuProps {
  videoId: string;
  variant?: 'ghost' | 'secondary';
  onRemove?: () => void;
}

function VideoMenu({ videoId, variant = 'ghost', onRemove }: VideoMenuProps) {
  const [openModal, setOpenModal] = useState(false);

  const onShare = () => {
    const fullUrl = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(fullUrl);
  };
  console.log(videoId)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={onShare}>
            <ShareIcon className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            <ListPlusIcon className="mr-2 size-4" />
            Tạo Playlist
          </DropdownMenuItem>
          {onRemove && (
            <DropdownMenuItem onClick={onRemove}>
              <Trash2Icon className="mr-2 size-4" />
              Remove
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <PlaylistCreateModal open={openModal} onOpenChange={setOpenModal} videoId={videoId} />
    </>
  );
}

export default VideoMenu;
