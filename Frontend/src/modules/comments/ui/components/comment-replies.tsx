import { CornerDownRightIcon, Loader2Icon } from "lucide-react";
import { CommentItem } from "./comment-items";
import { Button } from "@/components/ui/button";
import { mockComments } from "@/scripts/seed-catelogries";

interface CommentRepliesProps{
    parentId?:string;
    videoId?:string;
    commentReplies?:any;
}

export const CommentReplies=({
    parentId,
    videoId,
    commentReplies,

}:CommentRepliesProps)=>{

    const isLoading=false
    return (
        <div className="pl-14">
                <div className="flex flex-col gap-4 mt-2">
                    {
                        isLoading && (
                            <div className="flex items-center justify-center">
                                <Loader2Icon className="size-6 animate-spin text-muted-foreground"/>
                            </div>
                        )
                    }

                {!isLoading && 
  commentReplies?.other_comments.map((comment:any) => {
    return (
      <CommentItem
        key={comment.id}
        comment={comment}
        variant="reply"
        
        />
    );
  })
}

                </div>


        </div>

    )
}