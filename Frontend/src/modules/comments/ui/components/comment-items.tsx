'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon, MessageSquareIcon, MoreVerticalIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentReplies } from "./comment-replies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentService from "@/service/axios/comments/comment.service";
import { toast } from "sonner";
import { RequireLoginWrapper } from "@/components/require-login";
import { useUser } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { ICommentReactions, IToogleCommentReactions } from "@/service/type/comments.type";
import { Skeleton } from "@/components/ui/skeleton";

 

 interface CommentItemProps{
    comment:any;
    variant:any;

 }

 export const CommentItemSkeleton=()=>{
    return (
        <>
  <div className="flex gap-4">
    <Skeleton className="w-10 h-10 rounded-full" />

    <div className="flex-1 min-w-0 space-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>

      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-3/4 rounded" />

      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-4 w-5 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-4 w-5 rounded" />
        <Skeleton className="h-8 w-16 rounded" />
      </div>
    </div>

    <Skeleton className="h-8 w-8 rounded" />
  </div>

  <div className="mt-4 pl-14">
    <Skeleton className="h-10 w-full rounded" />
  </div>
</>
    )
 }

 export const CommentItem=({
    comment,variant
 }:CommentItemProps)=>{
    const [isReplyOpen,setIsReplyOpen]=useState(true);
    const [isRepliesOpen,setIsRepliesOpen]=useState(false);
    const queryClient = useQueryClient();
    const {user,isSignedIn}=useUser()
    if (!isSignedIn || !user || !comment) return null;

const userId = user.id;

    const {data:commentReactions,error}=useQuery({
        queryKey:["reactionsComment",comment?.id],
        queryFn:()=>commentService.getCommentReactions(comment?.id),
        enabled:!!comment?.id,
    })

    // toogleCommentReactions
    const {mutate:deleteComment}=useMutation({
        mutationFn:commentService.deleteCommentByUser,
        onSuccess: (_, deletedId) => {        
            queryClient.invalidateQueries({ queryKey: ["commentDetail", comment.video_id] });
        }
    })

    const {mutate:toogleComment}=useMutation({
        mutationFn:commentService.toogleCommentReactions,
        onSuccess: (_, deletedId) => {        
            queryClient.invalidateQueries({ queryKey: ["reactionsComment", comment.id] });
        }
    })
    const handleDeleteComment=(id:number)=>{
                toast.success("Delete comment successfully")

        deleteComment(String(id))
       
    }
    const viewerId=comment?.users?.clerk_user_id;
    const handleToogleCommentReactions=(type:"like"|"unlike")=>{
        let response:IToogleCommentReactions={
            userId,
            comment_id:comment.id,
            type:type,
        }
       if(!isSignedIn){
        return
       }
        toogleComment(response)
    }
    return (
            <>
                <div className="flex gap-4">
                    <Link href={`/user/${comment?.users?.clerk_user_id}`}>
                        <UserAvatar 
                        imageUrl={comment?.users?.avatar_url}
                        name={comment?.users?.channel_name}
                        size={variant==="comment"?"lg":"sm"}>
                        
                        </UserAvatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <Link href={`/users/${comment?.users?.clerk_user_id}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-medium text-sm pb-0.5">   {comment?.users?.channel_name}</span>

                                <span className="text-xs text-muted-foreground">{
                                    formatDistanceToNow(comment?.created_at,{
                                        addSuffix:true
                                    })
                                    }</span>
                             
                                </div></Link>
                                <p className="text-sm">{comment?.value}</p>
                               <RequireLoginWrapper>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{
                                            handleToogleCommentReactions("like")
                                            toast.success("Liked comment successfully")
                                        }}>
                                            <ThumbsUpIcon className={cn(
                                               comment?.type=="like" && "fill-black"
                                            )}/>
                                        </Button>
                                        <span className="text-xs text-muted-foreground">{commentReactions?.data?.like}</span>
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{
                                                                                        handleToogleCommentReactions("unlike")
                                            toast.success("Unliked comment successfully")

                                        }}>
                                           
                                            <ThumbsDownIcon className={cn()}/>
                                        </Button>
                                        <span className="text-xs text-muted-foreground">{commentReactions?.data?.unlike}</span>
                                    </div>
                                    {
                                        variant==="comment"&&(
                                            <Button variant="ghost" size="sm" className="h-8" onClick={()=>setIsReplyOpen((current)=>!current)}>
                                                Reply
                                            </Button>
                                        )
                                    }
                                </div>
                               </RequireLoginWrapper>
                              

                                
                        </div>
                      {
                        isSignedIn &&   <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="size-8">
                                    <MoreVerticalIcon/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>setIsReplyOpen((current)=>!current)}>
                                    <MessageSquareIcon className="size-4"/>
                                    Reply
                                </DropdownMenuItem>
                                {
                                    userId==viewerId ? (
                                           <DropdownMenuItem onClick={()=>{
                                    handleDeleteComment(comment?.id)
                                }}>
                                    <MessageSquareIcon className="size-4"/>
                                    Delete
                                </DropdownMenuItem>
                                    ):(
                                        <></>
                                    )
                                }
                             
                           

                            </DropdownMenuContent>
                        </DropdownMenu>
                      }  
                      
                
                </div>
             {!isReplyOpen && variant === "comment" && (
  <div className="mt-4 pl-14">
    <CommentForm
      variant="reply"
      parentId={comment?.id}
      videoId={comment?.video_id}
      onCancel={() => setIsReplyOpen(false)}
      onSuccess={() => {
        setIsReplyOpen(false)
        
      }}
    />
  
  </div>
)}


           {comment?.other_comments?.length > 0 && variant === "comment" && (
  <div className="pl-14">
    <Button
      variant="tertiary"
      size="sm"
      onClick={() => setIsRepliesOpen((current) => !current)}
    >
      {isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      {comment?.other_comments?.length} replies
    </Button>
  </div>
)}


                {comment?.other_comments?.length>0 && variant=="comment" && isRepliesOpen &&(
                    <CommentReplies
                    
                    commentReplies={comment}
                    parentId={comment.id}
                    videoId={comment.videoId}
                    />
                )}
            </>

    )
 }