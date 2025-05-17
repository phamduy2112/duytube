'use client'; // phải có nếu dùng useEffect, useUser...

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      console.log("👤 Đã đăng nhập:", user.fullName);
      // gọi mutate ở đây...
    }
  }, [isSignedIn, user]);

  return <p>Đang tạo người dùng...</p>;
}
