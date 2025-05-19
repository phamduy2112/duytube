'use client';

import { AuthService } from "@/service/axios/auth/auth.service";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function UserRegister() {
  const { isSignedIn, user } = useUser();
  const hasCalled = useRef(false); // ✅ Ngăn gọi mutate nhiều lần

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: AuthService.createUser,
    onSuccess: (data) => {
      console.log("✅ Tạo thành công:", data);
    },
    onError: (error) => {
      console.error("❌ Lỗi:", error);
    },
  });

  useEffect(() => {
    if (isSignedIn && user && !hasCalled.current) {
      const response = {
        clerkId: user.id,
        fullName: user.fullName || "",
        urlImage: user.imageUrl || "",
      };

      mutate(response);
      hasCalled.current = true; // ✅ Chặn gọi lại nếu render lại
    }
  }, [isSignedIn, user, mutate]);

  return (
    <>

    </>
  );
}
