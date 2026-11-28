'use client'

import { useActionState, useEffect, useRef } from 'react'
import { joinEarlyAccess, registerPartner, type FormState } from '../actions'

const initial: FormState = { status: 'idle', message: '' }

/** After a submission, move focus to the first invalid field, or to the success message. */
function useResultFocus(state: FormState) {
  const form = useRef<HTMLFormElement>(null)
  const success = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    if (state.status === 'success') success.current?.focus()
    else if (state.errors) form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
  }, [state])
  return { form, success }
}

function Honeypot() {
  return (
    <div className="hp" aria-hidden="true">
      <label>Leave this field empty <input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  )
}

function Status({ state }: { state: FormState }) {
  return (
    <p className={`form-status${state.status === 'error' ? ' is-error' : ''}`} role={state.status === 'error' ? 'alert' : 'status'}>
      {state.status === 'error' ? state.message : ''}
    </p>
  )
}

export function EarlyAccessForm({ id, source, tone = 'light' }: { id: string; source: string; tone?: 'light' | 'dark' }) {
  const [state, action, pending] = useActionState(joinEarlyAccess, initial)
  const { form, success } = useResultFocus(state)
  const error = state.errors?.email

  if (state.status === 'success') {
    return <p ref={success} tabIndex={-1} className={`form-success tone-${tone}`} role="status">{state.message}</p>
  }

  return (
    <form ref={form} action={action} className={`early-access tone-${tone}`} aria-describedby={`${id}-note`}>
      <input type="hidden" name="source" value={source} />
      <Honeypot />
      <div className="early-row">
        <label htmlFor={`${id}-email`} className="visually-hidden">Email address</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="Your email address"
          defaultValue={state.values?.email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button type="submit" className="btn btn-primary" disabled={pending} aria-disabled={pending}>
          {pending ? 'Joining…' : 'Join early access'}
        </button>
      </div>
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
      <Status state={state} />
      <p id={`${id}-note`} className="form-note">We’ll only use your email to tell you when Sairvan opens.</p>
    </form>
  )
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{hint && <span className="hint"> {hint}</span>}</label>
      {children}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  )
}

export function PartnerForm() {
  const [state, action, pending] = useActionState(registerPartner, initial)
  const { form, success } = useResultFocus(state)
  const e = state.errors ?? {}
  const v = state.values ?? {}
  const invalid = (key: string) => (e[key] ? { 'aria-invalid': true as const, 'aria-describedby': `partner-${key}-error` } : {})

  if (state.status === 'success') {
    return (
      <div className="partner-form">
        <p ref={success} tabIndex={-1} className="form-success tone-light" role="status">{state.message}</p>
      </div>
    )
  }

  return (
    <form ref={form} action={action} className="partner-form" aria-labelledby="partner-form-title">
      <h3 id="partner-form-title">Register your interest</h3>
      <Honeypot />
      <fieldset className="choice" {...(e.partnerType && { 'aria-describedby': 'partner-partnerType-error' })}>
        <legend>I am</legend>
        <div className="choice-options">
          {[['travel-agency', 'A travel agency'], ['independent-agent', 'An independent agent']].map(([value, label], i) => (
            <label key={value} className="choice-option">
              <input
                type="radio"
                name="partnerType"
                value={value}
                required
                defaultChecked={v.partnerType === value}
                {...(i === 0 && e.partnerType ? { 'aria-invalid': true } : {})}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {e.partnerType && <p id="partner-partnerType-error" className="field-error">{e.partnerType}</p>}
      </fieldset>
      <Field id="partner-name" label="Your name" error={e.name}>
        <input id="partner-name" name="name" autoComplete="name" required maxLength={120} defaultValue={v.name} {...invalid('name')} />
      </Field>
      <Field id="partner-business" label="Agency or business name" hint="(optional)">
        <input id="partner-business" name="business" autoComplete="organization" maxLength={160} defaultValue={v.business} />
      </Field>
      <Field id="partner-city" label="City or region you work in" error={e.city}>
        <input id="partner-city" name="city" autoComplete="address-level2" required maxLength={120} placeholder="e.g. Gilgit" defaultValue={v.city} {...invalid('city')} />
      </Field>
      <div className="field-pair">
        <Field id="partner-whatsapp" label="WhatsApp number" hint="(optional)" error={e.whatsapp}>
          <input id="partner-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="+92" defaultValue={v.whatsapp} {...invalid('whatsapp')} />
        </Field>
        <Field id="partner-email" label="Email" error={e.email}>
          <input id="partner-email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} defaultValue={v.email} {...invalid('email')} />
        </Field>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={pending} aria-disabled={pending}>
        {pending ? 'Sending…' : 'Register interest'}
      </button>
      <Status state={state} />
      <p className="form-note">We’ll only use these details to contact you about joining Sairvan. Registering doesn’t commit you to anything.</p>
    </form>
  )
}
