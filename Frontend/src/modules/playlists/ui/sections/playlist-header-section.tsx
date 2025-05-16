import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2Icon } from 'lucide-react';
import React from 'react'

interface PlaylistHeaderSectionProps{
    playlistId:string;
}
const PlaylistHeaderSectionSkeleton=()=>{
    return (
        <div className='flex flex-col gap-y-2'>
            <Skeleton className='h-6 w-24'/>
            <Skeleton className='h-6 w-32'/>
        </div>
    )
}
//  co suspense
export const PlaylistHeaderSection=({playlistId})=> {
  return (
    <div className='flex justify-between items-center'>
        <div>
            <h1 className='text-2xl font-bold'>History</h1>
            <p className='text-xs text-muted-foreground'>Videos fron the playlist</p>
        </div>
        <Button
        variant={"outline"}
        size={"icon"}
        className='rounded-full'
        >

            <Trash2Icon/> 
        </Button>
    </div>
  )
}

