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
            <div>
                <div className="flex gap-4">
                    <Link href={`/users/${comment?.userId}`}>
                        <UserAvatar 
                        imageUrl={comment.user.imageUrl}
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
                                <div className="flex items-center gap-2 mt-4">
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
                                            <Button variant="ghost" size="sm" className="h-8" onClick={()=>setIsReplyOpen(true)}>
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
                                <DropdownMenuItem onClick={()=>setIsReplyOpen(true)}>
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
                {
                    isRepliesOpen&&variant==="comment"&&(
                        <div className="mt-4 pl-14">
                            <CommentForm
                            variant="reply"
                            parentId={comment.id}
                            videoId={comment.videoId}
                            onCancel={()=>setIsReplyOpen(false)}

                            onSuccess={()=>{
                                setIsReplyOpen(false)
                                setIsRepliesOpen(true)
                            }}
                            >

                            </CommentForm>
                        </div>

                    )
                }

                {comment.replyCount>0 && variant==="comment" &&(
                    <div className="pl-14">
                        <Button
                        variant="tertiary"
                        size="sm"
                        onClick={()=>setIsRepliesOpen((current)=>!current)}
                        >
                            {/* {comment.replyCount}
                             */}
                             {isRepliesOpen?<ChevronUpIcon/>:<ChevronDownIcon/>}
                             0 replies
                        </Button>
                    </div>
                )}

                {comment.replyCount>0 && variant==="comment"&&isRepliesOpen&&(
                    <CommentReplies
                    parentId={comment.id};
                    video={comment.videoId}
                    />
                )}
            </div>
    )
 }