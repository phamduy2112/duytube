
'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListPlusIcon, MoreVerticalIcon, ShareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
interface VideoMenuProps{
    videoId:string;
    variant?:"ghost" |"secondary";
    onRemove?:()=>void;
}
function VideoMenu({
    videoId,
    variant,
    onRemove
}:VideoMenuProps) {
    const onShare=()=>{
        const fulUrl=`localhost:3000`
        navigator.clipboard.writeText(fulUrl);
        
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className='rounded-full'>
                <MoreVerticalIcon/>
            </Button>
        </DropdownMenuTrigger> 
        <DropdownMenuContent align='end' onClick={(e)=>e.stopPropagation()}>
            <DropdownMenuItem onClick={()=>{}}>
                <ShareIcon className='mr-2 size-4'/>
                Share
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShare}>
                <ListPlusIcon className='mr-2 size-4'/>
                Add to playlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{}}>
                <Trash2Icon className='mr-2 size-4'/>
                Remove
            </DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default VideoMenu