'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ChevronDownIcon, ChevronUpIcon, MessageSquareIcon, MoreVerticalIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentReplies } from "./comment-replies";

 

 interface CommentItemProps{
    comment:any[];
 }

 export const CommentItem=({
    comment,
 }:CommentItemProps)=>{
    const [isReplyOpen,setIsReplyOpen]=useState(false);
    const [isRepliesOpen,setIsRepliesOpen]=useState(false);
    const variant="comment"
    return(
            <>
                <div className="flex gap-4">
                    <Link href={`/users/${comment?.userId}`}>
                        <UserAvatar 
                        imageUrl={"https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/496150454_3799684950248327_219587134787243704_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JoJycapiivkQ7kNvwETfRna&_nc_oc=AdnI0UiR2vtsakP9xxDf8G3C9uGBZ4mwWjPkMnw3sLrj0J3HMUbfzdnw8hcTspUvCm8&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=CjRhbKdWtEGcd4ihhRB8_Q&oh=00_AfK9WouNqY2fQfnGo9oyJ5VmSQtiHyf_6-M7LZ0rNtm2kw&oe=6829235B"}
                        name={comment.user.name}
                        size={variant==="comment"?"lg":"sm"}>
                        
                        </UserAvatar>
                        </Link>
                        <div className="flex-1 min-w-0">
                            <Link href={`/users/${comment.userId}`}>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-medium text-sm pb-0.5">   {comment.user.name}</span>

                                <span className="text-xs text-muted-foreground">{
                                    formatDistanceToNow(comment.createAt,{
                                        addSuffix:true
                                    })
                                    }</span>
                             
                                </div></Link>
                                <p className="text-sm">{comment.value}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{}}>
                                            <ThumbsUpIcon className={cn(
                                                // comment.viewerReact==="Like" && "fill-black"
                                            )}/>
                                        </Button>
                                        <span className="text-xs text-muted-foreground">0</span>
                                        <Button disabled={false} variant="ghost" size="icon" className="size-8" onClick={()=>{}}>
                                            <ThumbsDownIcon className={cn()}/>
                                        </Button>
                                        <span className="text-xs text-muted-foreground">0</span>
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
                                <DropdownMenuItem onClick={()=>{}}>
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
      parentId={comment.id}
      videoId={comment.videoId}
      onCancel={() => setIsReplyOpen(false)}
      onSuccess={() => {
        setIsReplyOpen(false)
        setIsRepliesOpen(true) // <- đoạn này không được gọi nếu CommentForm không hiển thị
      }}
    />
  </div>
)}


           {comment.replyCount > 0 && variant === "comment" && (
  <div className="pl-14">
    <Button
      variant="tertiary"
      size="sm"
      onClick={() => setIsRepliesOpen((current) => !current)}
    >
      {isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      {comment.replyCount} replies
    </Button>
  </div>
)}


                {comment.replyCount>0 && variant=="comment" && isRepliesOpen &&(
                    <CommentReplies
                    parentId={comment.id}
                    video={comment.videoId}
                    />
                )}
            </>
    )
 }