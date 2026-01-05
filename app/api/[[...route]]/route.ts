import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

const routes = app
  .get('/hello', (c) => {
    return c.json({
      hello: 'world',
    })
  })

export type AppType = typeof routes

export const GET = handle(app)
export const POST = handle(app)
