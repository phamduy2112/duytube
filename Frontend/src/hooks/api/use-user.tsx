// hooks/useUserSubscriptions.ts
import { SubscriptionsService } from "@/service/axios/subscriptions/subscriptions.service";
import { UserService } from "@/service/axios/user/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUserSubscriptions = (userId?: string) => {
  return useQuery({
    queryKey: ["subscriptions", userId],
    queryFn: () => {
      if (!userId) throw new Error("userId is required");
      return SubscriptionsService.findMySubscriptions(userId);
    },
    enabled: !!userId, // tránh gọi nếu userId chưa có
  });
};
