'use client';

import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { VideoPlayer } from './video-player';
import { playlist } from '@/scripts/seed-catelogries';
import { VideoRowCard } from './video-row-card';

export default function MuxPlaylist({data,title}:any) {
    const [currentIndex,setCurrentIndex]=useState<number|null>(0)
      const currentVideo = currentIndex !== null ? data?.data[currentIndex] : null;

  return (
    <div className="flex flex-col gap-4">
    

      <div className="border px-[1rem] py-[1rem] h-[100%] max-h-[300px] overflow-y-auto rounded-2xl ">
        <div className='font-bold'>
            Video liked of duy
        </div>
        {data?.data?.map((video:any, index:number) => (
          <div
            key={index}
            
            onClick={() => setCurrentIndex(index)}
            className={`p-2 flex gap-[1rem] items-center rounded cursor-pointer w-[410px] m-auto ${
              index === currentIndex ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <div className='text-[.8rem]'>{index+1}</div>
            <VideoRowCard
                key={video.id}
                data={video}
                size="compact"
              />
          </div>
        ))}
      </div>
    </div>
  );
}
