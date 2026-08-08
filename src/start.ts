import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

// Hardening headers: block injected/third-party scripts (ads, trackers,
// XSS payloads), stop clickjacking, and keep referrers private.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://lovable.dev https://*.lovable.dev https://*.lovable.app",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://lovable.dev https://*.lovable.app",
  "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://*.lovable.app",
  "upgrade-insecure-requests",
].join("; ");

const securityHeadersMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next();
  const response =
    result instanceof Response ? result : (result as { response?: Response }).response;
  const headers = response instanceof Response ? response.headers : undefined;
  if (!headers) return result;

  // The Lovable editor preview injects its own tooling/bridge scripts and
  // websockets; a strict CSP breaks that iframe, so only enforce it in prod.
  if (process.env['NODE_ENV'] === "production") {
    headers.set("Content-Security-Policy", contentSecurityPolicy);
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  }
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-XSS-Protection", "0");
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );
  return result;
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware, securityHeadersMiddleware, csrfMiddleware],
}));
