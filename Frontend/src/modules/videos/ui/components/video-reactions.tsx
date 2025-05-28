'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { VideoService } from '@/service/axios/videos/video'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import React from 'react'

function VideoReactions({ id }: { id: string }) {
  const { user, isSignedIn } = useUser()
  const queryClient = useQueryClient()

  // Tổng số like / unlike
  const { data: getLikeCount } = useQuery({
    queryKey: ['total-get-like-count-video', id],
    queryFn: () => VideoService.getLikeCountVideo(id),
    enabled: !!id
  })

  // Kiểm tra người dùng đã like hay unlike chưa
  const { data: getReactionVideo } = useQuery({
    queryKey: ['get-like-count', id],
    queryFn: () =>
      VideoService.getReactionsVideos({
        videoId: id,
        clerk_user_id: user!.id
      }),
    enabled: !!id && !!user?.id
  })

  const viewerReaction = getReactionVideo?.type || null

  // Toggle like / unlike
  const { mutate: toggleReactionVideo } = useMutation({
    mutationFn: VideoService.toogleReactionsVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['total-get-like-count-video', id] })
      queryClient.invalidateQueries({ queryKey: ['get-like-count', id] })
    }
  })

  const handleToggleReactionsVideo = (type: 'like' | 'unlike') => {
    if (!isSignedIn || !user?.id) return

    toggleReactionVideo({
      video_id: id,
      user_id: user.id,
      type
    })
  }

  return (
    <div className="flex items-center-safe flex-none">
      <Button
        variant="secondary"
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        onClick={() => handleToggleReactionsVideo('like')}
      >
        <ThumbsUpIcon className={cn('size-5', viewerReaction == 'like' && 'fill-black')} />
        {getLikeCount?.like ?? 0}
      </Button>

      <Separator orientation="vertical" className="h-7" />

      <Button
        variant="secondary"
        className="rounded-l-none rounded-r-full pr-4"
        onClick={() => handleToggleReactionsVideo('unlike')}
      >
        <ThumbsDownIcon className={cn('size-5', viewerReaction == 'unlike' && 'fill-black')} />
        {getLikeCount?.unlike ?? 0}
      </Button>
    </div>
  )
}

export default VideoReactions
