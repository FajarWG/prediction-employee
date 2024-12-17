'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Employee Promotion Prediction
        </Link>
        <div>
          {pathname === '/dashboard' ? (
            <Button variant="ghost" asChild>
              <Link href="/">Logout</Link>
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

