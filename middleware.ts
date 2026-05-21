// Middleware DISABLED by default — monolingual sites don't need it.
// The setup script (`pnpm setup`) will enable next-intl routing
// when client.config.ts has i18n: true and multiple locales.
//
// To enable manually:
//   import createMiddleware from "next-intl/middleware";
//   import { routing } from "@/lib/i18n/navigation";
//   export default createMiddleware(routing);

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
