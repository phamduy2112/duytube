import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: "pk_test_cmFwaWQtYmF0LTQuY2xlcmsuYWNjb3VudHMuZGV2JA",
    CLERK_SECRET_KEY: "sk_test_Tr71vVJ9SydOVEl5nEKpWCzmzem9QX1h4bVSF9Pg8c",
  },
};

export default nextConfig;
