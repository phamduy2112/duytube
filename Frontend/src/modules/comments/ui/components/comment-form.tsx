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

interface CommentFormProps {
  videoId: string;
  parentId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  variant?: "comment" | "reply";
}

type FormValues = {
  value: string;
};

export const CommentForm = ({
  videoId,
  parentId,
  onCancel,
  onSuccess,
  variant = "comment",
}: CommentFormProps) => {
  const { user } = useUser();

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
  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  const onSubmit = (data: FormValues) => {

    const response={
      content:data.value,
      videoId,
      userId:user?.id,
      ...(variant === "reply" && { parentId }),
    }

    console.log(response)
    mutate(response);
    toast.success("Thanh cong")
  };

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
            <Button type="submit" size="sm">
              {variant === "reply" ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
