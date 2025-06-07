"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/service/axios/comments/comment.service";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateNotification } from "@/hooks/api/use-notification";

interface CommentFormProps {
  videoId: string;
  parentId?: string;
  ownerId?:string
  onSuccess?: () => void;
  onCancel?: () => void;
  variant?: "comment" | "reply";
}
interface CommentPayload {
  content: string;
  videoId: string;
  userId?: string;    // có thể undefined nếu user chưa login
  parentId?: string | number;
}
type FormValues = {
  value: string;
};
export const CommentFormSkeleton=()=>{
  return (  <div className="flex gap-4">
    <Skeleton className="w-10 h-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-[70px] w-full rounded-md" />
      <div className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  </div>)
}
export const CommentForm = ({
  videoId,
  parentId,
  onCancel,
  onSuccess,
  ownerId,
  variant = "comment",
}: CommentFormProps) => {
  const { user,isSignedIn } = useUser();
  const form = useForm<FormValues>({
    defaultValues: {
      value: "",
    },
  });
  const queryClient = useQueryClient();

  const {mutate}=useMutation({
     mutationFn: commentService.createComment,
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["commentDetail", videoId] });

          form.reset();
          onSuccess?.();

        },
        onError: (error) => {
          console.error("❌ Lỗi:", error);
        },
  })
  const dataNotification:any=({
    type:"comment",
    video_id:videoId,
    content:`Video of you have create comment`,
    clerk_user_id:user?.id,
    user_id:ownerId
  })
  const {createNotification}=useCreateNotification()
  const handleCancel = () => {
    form.reset();
   onCancel?.();
  };

  const onSubmit = (data: FormValues) => {

    const response:any={
      content:data.value,
      userId:user?.id,
      videoId,

      ...(variant === "reply" && { parentId }),
    }

  
        

   
    mutate(response);
    if(variant==="comment"){
    toast.success("Successfully")
      if(user?.id==ownerId){
        return
    }

    createNotification(dataNotification); // đúng cách
    }


  };
const value = form.watch("value"); // 👈 theo dõi giá trị textarea

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 group"
      >
        <UserAvatar
          size="lg"
          imageUrl={user?.imageUrl || "/placeholder.svg"}
          name={user?.username || "User"}
        />
        <div className="flex-1">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      variant === "reply"
                        ? "Reply to this comment"
                        : "Add a comment"
                    }
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="justify-end gap-2 mt-2 flex">
            {onCancel && (
              <Button
                variant="ghost"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
       <Button
  type="submit"
  size="sm"
disabled={!value?.trim() || !isSignedIn}
  className={!value?.trim() ? "opacity-50 cursor-not-allowed" : ""}
>
  {variant === "reply" ? "Reply" : "Comment"}
</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
