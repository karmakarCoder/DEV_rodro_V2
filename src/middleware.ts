import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret",
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ==========================================
  // 1. GLOBAL CORS HANDLING FOR API ROUTES
  // ==========================================
  if (pathname.startsWith("/api")) {
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    // Set CORS origins for all outgoing standard API responses
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return response;
  }

  // ==========================================
  // 2. ROUTE & AUTHENTICATION ACCESS CONTROLS
  // ==========================================
  const token = request.cookies.get("token")?.value;

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error("JWT Verify Error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect to dashboard if already logged in and trying to access login page
  if (pathname.startsWith("/login")) {
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // Token invalid, allow access to login page normally
      }
    }
  }

  return NextResponse.next();
}

// ==========================================
// 3. UPDATED CONFIG MATCHER
// ==========================================
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/api/:path*"],
};
