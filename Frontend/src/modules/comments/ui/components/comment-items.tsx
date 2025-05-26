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
import CommentsSection from "@/modules/videos/sections/comments-section";

 

 interface CommentItemProps{
    comment:any[];
 }

 export const CommentItem=({
    comment,
 }:CommentItemProps)=>{
    const [isReplyOpen,setIsReplyOpen]=useState(true);
    const [isRepliesOpen,setIsRepliesOpen]=useState(false);
    const variant="comment"
    const queryClient = useQueryClient();

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
    const handleDeleteComment=(id:string)=>{
        deleteComment(id)
        toast.success("Xoa thanh cong")
    }
    const handleToogleCommentReactions=(type:"like"|"unlike")=>{
        let response={
            userId:comment?.users.id,
            comment_id:comment.id,
            type:type,
        }
        toogleComment(response)
    }
    console.log(commentReactions)
    return(
            <>
                <div className="flex gap-4">
                    <Link href={`/users/${comment?.users?.id}`}>
                        <UserAvatar 
                        imageUrl={comment?.users?.avatar_url}
                        name={comment?.users?.channel_name}
                        size={variant==="comment"?"lg":"sm"}>
                        
                        </UserAvatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <Link href={`/users/${comment?.users?.id}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-medium text-sm pb-0.5">   {comment?.users?.channel_name}</span>

                                {/* <span className="text-xs text-muted-foreground">{
                                    formatDistanceToNow(comment?.create_at,{
                                        addSuffix:true
                                    })
                                    }</span> */}
                             
                                </div></Link>
                                <p className="text-sm">{comment?.value}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{
                                            handleToogleCommentReactions("like")
                                        }}>
                                            <ThumbsUpIcon className={cn(
                                                // comment.viewerReact==="Like" && "fill-black"
                                            )}/>
                                        </Button>
                                        <span className="text-xs text-muted-foreground">{commentReactions?.data?.like}</span>
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{
                                                                                        handleToogleCommentReactions("unlike")

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

                                
                        </div>
                        <DropdownMenu>
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
                                <DropdownMenuItem onClick={()=>{
                                    handleDeleteComment(comment?.id)
                                }}>
                                    <MessageSquareIcon className="size-4"/>
                                    Delete
                                </DropdownMenuItem>
                           

                            </DropdownMenuContent>
                        </DropdownMenu>
                
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
        setIsRepliesOpen(true) // <- đoạn này không được gọi nếu CommentForm không hiển thị
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
                    video={comment.videoId}
                    />
                )}
            </>

    )
 }