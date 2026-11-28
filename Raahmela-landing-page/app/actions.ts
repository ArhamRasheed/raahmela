'use server'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: Record<string, string>
  values?: Record<string, string>
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9 ()-]{7,20}$/

const text = (data: FormData, key: string, max = 200) => String(data.get(key) ?? '').trim().slice(0, max)

const notConfigured = (): FormState => ({
  status: 'error',
  message:
    'Signup isn’t open yet, so your details were not saved. Please check back soon.' +
    (process.env.NODE_ENV === 'production' ? '' : ' (Developer note: set SIGNUP_WEBHOOK_URL to enable signups.)'),
})

/** Sends a signup to the configured webhook. Never reports success unless the webhook accepted it. */
async function deliver(payload: Record<string, string>): Promise<'ok' | 'missing' | 'failed'> {
  const url = process.env.SIGNUP_WEBHOOK_URL
  if (!url) {
    console.error('[signup] SIGNUP_WEBHOOK_URL is not set. The signup was rejected and not stored.')
    return 'missing'
  }
  try {
    const secret = process.env.SIGNUP_WEBHOOK_SECRET
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(secret && { authorization: `Bearer ${secret}` }) },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
      cache: 'no-store',
    })
    if (!res.ok) {
      console.error(`[signup] Webhook responded with ${res.status}.`)
      return 'failed'
    }
    return 'ok'
  } catch (error) {
    console.error('[signup] Webhook request failed.', error)
    return 'failed'
  }
}

const failed: FormState = {
  status: 'error',
  message: 'We couldn’t save your details just now. Please try again in a few minutes.',
}

export async function joinEarlyAccess(_prev: FormState, data: FormData): Promise<FormState> {
  const email = text(data, 'email', 254)
  const source = text(data, 'source', 20) || 'page'
  // Honeypot: real visitors never see or fill this field.
  if (text(data, 'website')) return { status: 'success', message: 'Thank you.' }

  if (!EMAIL.test(email)) {
    return { status: 'error', message: 'Please check the highlighted field.', errors: { email: 'Enter a valid email address, like name@example.com.' }, values: { email } }
  }

  const result = await deliver({ type: 'traveler', email, source })
  if (result === 'missing') return { ...notConfigured(), values: { email } }
  if (result === 'failed') return { ...failed, values: { email } }
  return { status: 'success', message: `You’re on the early-access list. We’ll email ${email} when Sairvan opens.` }
}

export async function registerPartner(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    partnerType: text(data, 'partnerType', 40),
    name: text(data, 'name', 120),
    business: text(data, 'business', 160),
    city: text(data, 'city', 120),
    whatsapp: text(data, 'whatsapp', 30),
    email: text(data, 'email', 254),
  }
  if (text(data, 'website')) return { status: 'success', message: 'Thank you.' }

  const errors: Record<string, string> = {}
  if (!['travel-agency', 'independent-agent'].includes(values.partnerType)) errors.partnerType = 'Choose whether you’re a travel agency or an independent agent.'
  if (!values.name) errors.name = 'Enter your name.'
  if (!values.city) errors.city = 'Enter the city or region you work in.'
  if (values.whatsapp && !PHONE.test(values.whatsapp)) errors.whatsapp = 'Enter a phone number using digits, for example +92 300 1234567.'
  if (!EMAIL.test(values.email)) errors.email = 'Enter a valid email address, like name@example.com.'
  if (Object.keys(errors).length) {
    const count = Object.keys(errors).length
    return { status: 'error', message: `Please check the ${count === 1 ? 'highlighted field' : `${count} highlighted fields`}.`, errors, values }
  }

  const result = await deliver({ type: 'partner', ...values })
  if (result === 'missing') return { ...notConfigured(), values }
  if (result === 'failed') return { ...failed, values }
  return { status: 'success', message: `Thanks, ${values.name}. We’ve received your details and will be in touch.` }
}
