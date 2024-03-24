export { default } from "next-auth/middleware";

// Protected routes
export const config = {
  matcher: [
    "/",
    "/crops",
    "/expertise",
    "/extension-workers",
    "/farmers",
    "/input-types",
    "/planted-crops",
  ],
};
