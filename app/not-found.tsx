'use client'

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='mt-24 w-full flex flex-col gap-1 justify-center items-center'>
      <h2>Page Not Found</h2>
      <Link href="/" className="text-blue-100">Return Home</Link>
    </div>
  )
}