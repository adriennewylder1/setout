import { auth } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'
import { getSupabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

async function getTrips(clerkId: string) {
  const { data: user } = await getSupabaseAdmin()
    .from('users')
    .select('id')
    .eq('clerk_id', clerkId)
    .single()

  if (!user) return []

  const { data: trips } = await getSupabaseAdmin()
    .from('trips')
    .select('*')
    .eq('guide_id', user.id)
    .order('created_at', { ascending: false })

  return trips || []
}

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    draft: 'bg-stone-100 text-stone-600',
    published: 'bg-green-100 text-green-700',
    full: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-600',
  }
  return styles[status] || styles.draft
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  })
}

export default async function DashboardPage() {
  const { userId } = await auth()
  const trips = userId ? await getTrips(userId) : []

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-stone-800 text-lg tracking-tight">setout</span>
        <UserButton afterSignOutUrl="/" />
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Your Trips</h1>
            <p className="text-stone-500 text-sm mt-1">
              {trips.length === 0 ? 'No trips yet' : `${trips.length} trip${trips.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <Link
            href="/dashboard/trips/new"
            className="bg-stone-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            + New trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="border-2 border-dashed border-stone-300 rounded-xl p-16 text-center">
            <p className="text-stone-400 text-lg mb-6">You haven&apos;t created any trips yet.</p>
            <Link
              href="/dashboard/trips/new"
              className="inline-block bg-stone-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors"
            >
              Create your first trip
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {trips.map((trip: any) => (
              <div
                key={trip.id}
                className="bg-white border border-stone-200 rounded-xl p-5 flex items-center justify-between hover:border-stone-300 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-semibold text-stone-900 truncate">{trip.title}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize flex-shrink-0 ${statusBadge(trip.status)}`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <span>📍 {trip.location_name}</span>
                    <span>📅 {formatDate(trip.start_date)}</span>
                    <span>👥 {trip.max_participants} max</span>
                    {trip.price_per_person && (
                      <span>💰 ${trip.price_per_person}/person</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <Link
                    href={`/dashboard/trips/${trip.id}`}
                    className="text-sm text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}