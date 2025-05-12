import React from 'react'
import UserSection from '../sections/user-section'
import { VideosVideoSection } from '../ui/components/video-sections'

function UserView({userId}) {
  return (
    <div className='flex flex-col max-w-[full] px-4 pt-2.5 mx-auto'>

        <UserSection userId={userId}/>
        <VideosVideoSection/>
    </div>
  )
}

export default UserView