'use client'
import React, { useState } from 'react'
import UserSection from '../sections/user-section'
import { VideosVideoSection } from '../ui/components/video-sections'

function UserView({userId}) {
  const [activeItem, setActiveItem] = useState("Trang chủ"); // Thêm state activeItem
  const handleItemClick = (item:string) => {
    setActiveItem(item); // Cập nhật item được chọn
  };
  return (
    <div className='flex flex-col max-w-[full] px-4 pt-2.5 mx-auto'>

        <UserSection userId={userId} activeItem={activeItem} handleItemClick={handleItemClick}/>
        
        <VideosVideoSection activeItem={activeItem}/>
    </div>
  )
}

export default UserView