'use client'
import React, { useState } from 'react'
import UserSection from '../sections/user-section'
import { VideosVideoSection } from '../ui/components/video-sections'
import { useQuery } from '@tanstack/react-query';
import { UserService } from '@/service/axios/user/user.service';

function UserView({userId}) {
  const [activeItem, setActiveItem] = useState("Trang chủ"); // Thêm state activeItem
  const handleItemClick = (item:string) => {
    setActiveItem(item); // Cập nhật item được chọn
  };
    // const {user}=useUser();
  const {data:userDetail}=useQuery({
    queryKey:["get-user-detail",userId],
    queryFn:()=>UserService.getUser(userId),
    enabled:!!userId,


  })

  if (!userDetail) {
    return <div>Không tìm thấy người dùng.</div>;
  }

  return (
    <div className='flex flex-col max-w-[full] px-4 pt-2.5 mx-auto'>

        <UserSection userId={userId} activeItem={activeItem} handleItemClick={handleItemClick}/>
        
        <VideosVideoSection activeItem={activeItem} userDetail={userDetail}/>
    </div>
  )
}

export default UserView