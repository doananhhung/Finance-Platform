import { hc } from 'hono/client'
// Import kiểu dữ liệu từ file route backend
import { AppType } from '@/app/api/[[...route]]/route'

// Thay thế URL bằng địa chỉ thật của bạn (localhost hoặc production)
// Trong thực tế nên dùng biến môi trường: process.env.NEXT_PUBLIC_APP_URL
const client = hc<AppType>('http://localhost:3000')

export default client