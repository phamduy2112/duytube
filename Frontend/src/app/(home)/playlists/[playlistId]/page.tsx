// /pages/playlists/[playlistId]/page.tsx

import { VideosView } from '@/modules/playlists/ui/views/videos-view';
import React from 'react';


const Page = async ({params}:any) => {
 
  
const {playlistId}=await params
  return (
    <div>   
      {/* Fetch và hiển thị thông tin playlist dựa trên playlistId */}
      <VideosView playlistId={playlistId}/>
    </div>
  );
};

export default Page; // Đảm bảo export mặc định
