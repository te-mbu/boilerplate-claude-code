import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/navigation";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, static files, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
