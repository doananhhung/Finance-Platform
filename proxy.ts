import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

// Thêm matcher cho API routes để Proxy không chặn, nhường quyền xử lý cho Hono
const isApiRoute = createRouteMatcher(['/api(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Chỉ bảo vệ nếu: KHÔNG phải public route VÀ KHÔNG phải API route
  if (!isPublicRoute(req) && !isApiRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}