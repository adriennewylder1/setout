import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    + '-' + Math.random().toString(36).slice(2, 7)
}

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  const {
    title,
    description,
    activity_type,
    location_name,
    start_date,
    end_date,
    max_participants,
    price_per_person,
    meeting_point,
    what_to_bring,
    cancellation_policy,
  } = body

  // Basic validation
  if (!title || !activity_type || !location_name || !start_date || !end_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (new Date(end_date) < new Date(start_date)) {
    return NextResponse.json({ error: 'End date must be after start date' }, { status: 400 })
  }

  // Get the user's Supabase row
  const { data: user, error: userError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (userError || !user) {
    // User doesn't exist in Supabase yet — create them on the fly
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert({ clerk_id: userId, email: '', plan: 'free' })
      .select('id')
      .single()

    if (createError || !newUser) {
      return NextResponse.json({ error: 'Failed to resolve user' }, { status: 500 })
    }
  }

  const { data: freshUser } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('clerk_id', userId)
    .single()

  if (!freshUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 500 })
  }

  const slug = generateSlug(title)

  const { data: trip, error: tripError } = await supabaseAdmin
    .from('trips')
    .insert({
      guide_id: freshUser.id,
      title: title.trim(),
      description: description?.trim() || null,
      activity_type,
      location_name: location_name.trim(),
      start_date,
      end_date,
      max_participants: parseInt(max_participants) || 12,
      price_per_person: price_per_person ? parseFloat(price_per_person) : null,
      meeting_point: meeting_point?.trim() || null,
      what_to_bring: what_to_bring?.trim() || null,
      cancellation_policy: cancellation_policy?.trim() || null,
      status: 'draft',
      slug,
    })
    .select()
    .single()

  if (tripError) {
    console.error('Trip insert error:', tripError)
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 })
  }

  return NextResponse.json({ trip }, { status: 201 })
}
