import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { Bell } from 'lucide-react'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { NotificationoService } from '@/service/axios/notification/notification.service'

function Notification() {
  const { user } = useUser();
  if (!user) return null;

  // Lấy notifications
  const { data: notifications } = useQuery({
    queryKey: ['notification', user.id],
    queryFn: () => NotificationoService.getNotification(user.id),
    enabled: !!user.id,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px]" align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto px-2">
          {notifications?.map((item:any) => (
            <DropdownMenuItem key={item.id} className="flex gap-3 items-center">
              

              {/* Nội dung thông báo */}
              <div className="flex flex-col flex-grow min-w-0">
                <p className="text-sm truncate">{item.content}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </p>
              </div>
              {/* Thumbnail hình nhỏ, cố định kích thước */}
              <div className="relative w-16 h-9 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                {item.videos?.mux_playback_id ? (
                  <Image
                    src={`https://image.mux.com/${item.videos.mux_playback_id}/thumbnail.jpg`}
                    alt="video thumbnail"
                    layout="fill"
                    objectFit="cover"
                    priority={false}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
            </DropdownMenuItem>
          ))}
          {!notifications?.length && (
            <p className="p-4 text-center text-gray-400">No notifications</p>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification;
