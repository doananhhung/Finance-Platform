import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

// Middleware chung
app.use('*', clerkMiddleware())

// QUAN TRỌNG: Gán chuỗi các route vào biến 'routes' để lấy Type
const routes = app
  .get('/hello', (c) => {
    const auth = getAuth(c)
    if (!auth?.userId) {
      return c.json({ message: 'Unauthorized' }, 401)
    }
    return c.json({
      message: 'Hello Next.js 16 + Hono + Clerk!',
      userId: auth.userId,
    })
  })
  .post(
    '/create-profile',
    zValidator(
      'json',
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
      })
    ),
    (c) => {
      const auth = getAuth(c)
      const { name, email } = c.req.valid('json')
      return c.json({
        message: 'Profile created!',
        user: { name, email },
        createdBy: auth?.userId,
      })
    }
  )

// 1. Export Type này để Frontend dùng
export type AppType = typeof routes

// 2. Export handler cho Next.js
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)