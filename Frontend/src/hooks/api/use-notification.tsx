import { NotificationoService } from "@/service/axios/notification/notification.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNotification = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate: createNotification, isError, error } = useMutation({
    mutationFn: NotificationoService.createNotification,
    onSuccess: (data, variables) => {
      // Invalidate theo video_id nếu cần
      if (variables?.video_id) {
        queryClient.invalidateQueries({ queryKey: ["notification", variables.video_id] });
      }

      onSuccess?.();
    },
    onError: (error) => {
      console.error("❌ Lỗi:", error);
    },
  });

  return { createNotification, isError, error };
};
