import { CornerDownRightIcon, Loader2Icon } from "lucide-react";
import { CommentItem } from "./comment-items";
import { Button } from "@/components/ui/button";

interface CommentRepliesProps{
    parentId:string;
    videoId:string;
}

export const CommentReplies=({
    parentId,
    videoId,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
}:CommentRepliesProps)=>{
    const isLoading=true
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
                    Array(5).map((comment)=>{
                        <CommentItem
                        key={comment.id}
                        comment={comment}
                        variant="reply"
                        />
                    })
                    }
                </div>

{
    hasNextPage&&(
        <Button variant="tertiary" size="sm" onClick={()=>fetchNextPage()} disabled={isFetchingNextPage}>
            <CornerDownRightIcon/>
            Show more replies
        </Button>
    )
}
        </div>

    )
}