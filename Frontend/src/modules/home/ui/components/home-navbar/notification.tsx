import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/user-avatar'
import { NotificationoService } from '@/service/axios/notification/notification.service'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Bell } from 'lucide-react'
import React, { useState } from 'react'

function Notification() {
    const {user}=useUser()
    if(!user){
      return null
    }
    const {data:notification,error}=useQuery({
        queryKey:["notification",user?.id],
        queryFn:()=>NotificationoService.getNotification(user?.id),
        enabled:!!user?.id,
    })
  return (
    <div> 
<DropdownMenu >
  <DropdownMenuTrigger><Bell/></DropdownMenuTrigger>
  <DropdownMenuContent className='w-[500px]' align='end'>
    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <div>
          {notification?.map((item)=>{
            return (
  <div className="flex gap-3">
                 <div>
                        <UserAvatar
                        imageUrl="https://yt3.ggpht.com/yti/ANjgQV9lu9ZqUHoOmFdhvvuoE9kZFb5QMHvTSQs5hIXfyacQgA=s88-c-k-c0x00ffffff-no-rj"
                        name="duy"
                        />
                    </div>
               <div>
                <div>
            <p>               
              {item?.content}
</p>
<p>{ formatDistanceToNow(item?.created_at,{
                                                      addSuffix:true
                                                  })}</p>
                </div>

               </div>
                 </div>
            )
          })}
             
        </div>
    </DropdownMenuItem>
  
  </DropdownMenuContent>
</DropdownMenu>
      </div>
  )
}

export default Notification