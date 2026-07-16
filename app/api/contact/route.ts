import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '')
    .replace(/</g, '')
    .replace(/>/g, '')

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email.' }, { status: 400 })
  }
  if (message.length < 5) {
    return NextResponse.json({ error: 'Please add a short message.' }, { status: 400 })
  }

  const user = process.env.CONTACT_EMAIL
  const pass = process.env.CONTACT_APP_PASSWORD

  if (!user || !pass) {
    return NextResponse.json(
      { error: 'Mail service is not configured.' },
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      replyTo: email,
      to: user,
      subject: `Portfolio - New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Inter,Helvetica,Arial,sans-serif;color:#111;">
          <h2 style="margin:0 0 12px;">New contact from ${name}</h2>
          <p style="margin:0 0 8px;"><strong>Email:</strong>
            <a href="mailto:${email}">${email}</a>
          </p>
          <p style="white-space:pre-wrap;line-height:1.6;margin:16px 0 0;
            padding:16px;background:#f5f5f5;border-radius:12px;">${escapeHtml(
              message
            )}</p>
        </div>
      `,
    })
  } catch (e){
    console.log(e);

    return NextResponse.json(
      { error: 'Could not send your message. Please try again later.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}