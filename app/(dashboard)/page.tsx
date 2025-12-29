'use client'

import { useEffect, useState } from 'react' // Import React hooks
import client from '@/lib/hono' // Import client vừa tạo

export default function DashboardPage() {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    // Hàm gọi API
    const fetchData = async () => {
      // GỌI API THEO KIỂU RPC
      // Bạn gõ dấu chấm (.) nó sẽ tự gợi ý api -> hello -> $get
      const res = await client.api.hello.$get()

      if (res.ok) {
        const data = await res.json()
        setMsg(data.message) // data.message tự động có type string
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>API Response: {msg || 'Loading...'}</p>
      
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={async () => {
           // Thử gọi API create-profile
           const res = await client.api['create-profile'].$post({
             json: {
               name: "Hung Doan",
               email: "test@gmail.com" 
               // Nếu bạn xóa dòng email đi, code sẽ báo lỗi đỏ ngay lập tức!
             }
           })
           if(res.ok) {
             const data = await res.json()
             alert(data.message)
           } else {
             alert("Lỗi validation hoặc chưa đăng nhập")
           }
        }}
      >
        Test Create Profile
      </button>
    </div>
  )
}