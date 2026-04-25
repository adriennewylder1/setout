'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ACTIVITY_TYPES = [
  'hiking', 'fishing', 'kayaking', 'birding',
  'camping', 'hunting', 'climbing', 'rafting', 'other'
]

export default function NewTripPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    activity_type: '',
    location_name: '',
    start_date: '',
    end_date: '',
    max_participants: '12',
    price_per_person: '',
    meeting_point: '',
    what_to_bring: '',
    cancellation_policy: '',
  })

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Failed to create trip. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-stone-800 text-lg tracking-tight hover:text-stone-600 transition-colors">
          ← setout
        </Link>
        <span className="text-stone-400 text-sm">New trip</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-stone-900 mb-1">Create a trip</h1>
        <p className="text-stone-500 mb-8">Fill in the details. You can edit everything later.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Trip title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Early Season Fly Fishing on the Deschutes"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
            />
          </div>

          {/* Activity type */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Activity type <span className="text-red-400">*</span>
            </label>
            <select
              required
              value={form.activity_type}
              onChange={e => set('activity_type', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm bg-white"
            >
              <option value="">Select an activity</option>
              {ACTIVITY_TYPES.map(a => (
                <option key={a} value={a}>
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Location <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Deschutes River, Oregon"
              value={form.location_name}
              onChange={e => set('location_name', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Start date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={form.start_date}
                onChange={e => set('start_date', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                End date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                required
                value={form.end_date}
                onChange={e => set('end_date', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm bg-white"
              />
            </div>
          </div>

          {/* Participants + Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Max participants <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                max="500"
                value={form.max_participants}
                onChange={e => set('max_participants', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Price per person (USD)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.price_per_person}
                onChange={e => set('price_per_person', e.target.value)}
                className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
              />
              <p className="text-xs text-stone-400 mt-1">Leave blank for free trips</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Tell participants what this trip is about, what to expect, what makes it special..."
              value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Meeting point */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Meeting point
            </label>
            <input
              type="text"
              placeholder="e.g. Trailhead parking lot off Hwy 26, coordinates 45.123, -121.456"
              value={form.meeting_point}
              onChange={e => set('meeting_point', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm"
            />
          </div>

          {/* What to bring */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              What to bring
            </label>
            <textarea
              rows={3}
              placeholder="List gear, clothing, food, permits participants need to bring..."
              value={form.what_to_bring}
              onChange={e => set('what_to_bring', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Cancellation policy */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Cancellation policy
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Full refund if cancelled 7+ days before trip. No refund within 48 hours."
              value={form.cancellation_policy}
              onChange={e => set('cancellation_policy', e.target.value)}
              className="w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-stone-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {loading ? 'Saving...' : 'Save trip'}
            </button>
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-lg font-medium text-stone-600 hover:text-stone-900 transition-colors text-sm"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </main>
  )
}