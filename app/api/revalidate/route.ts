import { createHmac, timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function verifySignature(body: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader?.startsWith('sha256=')) return false
  const expected = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`
  const a = Buffer.from(signatureHeader)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret is not configured.' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('x-hub-signature-256')

  if (!verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let payload: { zen?: string }
  try {
    payload = JSON.parse(body) as { zen?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  if (payload.zen) {
    return NextResponse.json({ ok: true, ping: true })
  }

  revalidateTag('articles', 'max')
  return NextResponse.json({ revalidated: true, tag: 'articles' })
}