import { InfiniteScroll } from '@/components/infinite-scroll'
import { CommentForm } from '@/modules/comments/ui/components/comment-form'
import { CommentItem } from '@/modules/comments/ui/components/comment-items'
import React, { Suspense } from 'react'

export const CommentsSection({videoId})=>{
    return (
        <Suspense>
            <CommentsSectionSuspense videoId={videoId}/>
        </Suspense>
    )
}

function CommentsSectionSuspense({videoId}) {
  return (
    <div className='mt-6'>
        <div className='flex flex-col gap-6'>
            <h1>0 Comments</h1>
            <CommentForm videoId={videoId}/>
            <div className='flex flex-col gap-4 mt-2'>
                    <CommentItem key={comment.id} comment={comment}/>
                {/* <InfiniteScroll hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
                ></InfiniteScroll> */}
            </div>

        </div>
    </div>
  )
}

