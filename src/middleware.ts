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
  }

  // ==========================================
  // 2. SYSTEM MAINTENANCE CHECK (NEW)
  // ==========================================
  // Bypass maintenance checks for the configuration endpoints and admin dashboards
  const isBypassRoute =
    pathname.startsWith("/api/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/_next") ||
    pathname === "/maintenance" ||
    pathname.includes(".");

  if (!isBypassRoute) {
    try {
      // Fetch the maintenance status flag from your admin API
      const res = await fetch(
        `${request.nextUrl.origin}/api/admin/maintenance`,
        {
          next: { revalidate: 10 }, // Cache connection check for 10 seconds to optimize speed
        },
      );
      const data = await res.json();

      if (data?.isMaintenanceMode) {
        // Handle API route blockages
        if (pathname.startsWith("/api")) {
          return NextResponse.json(
            { error: "Service Unavailable", message: data.message },
            {
              status: 503,
              headers: { "Access-Control-Allow-Origin": "*" }, // Retain CORS on 503 errors
            },
          );
        }

        // Handle Frontend Page route blockages (requires a page at app/maintenance/page.tsx)
        return NextResponse.rewrite(new URL("/maintenance", request.url));
      }
    } catch (e) {
      console.error("Maintenance check failed to fetch:", e);
    }
  }

  // ==========================================
  // 3. ROUTE & AUTHENTICATION ACCESS CONTROLS
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

  // ==========================================
  // 4. SET GLOBAL CORS FOR STANDARD API RESPONSES
  // ==========================================
  const response = NextResponse.next();
  if (pathname.startsWith("/api")) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }
  return response;
}

// ==========================================
// 5. UPDATED CONFIG MATCHER
// ==========================================
export const config = {
  // Match all request paths except for the ones starting with:
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
