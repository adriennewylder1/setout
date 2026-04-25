import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-stone-800 text-lg tracking-tight">setout</span>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Your Trips</h1>
        <p className="text-stone-500 mb-10">Create and manage your outdoor trips.</p>
        <div className="border-2 border-dashed border-stone-300 rounded-xl p-16 text-center">
          <p className="text-stone-400 text-lg mb-6">You haven't created any trips yet.</p>
          <Link href="/dashboard/trips/new" className="inline-block bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors">
            Create your first trip
          </Link>
        </div>
      </div>
    </main>
  )
}