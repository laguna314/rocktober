import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, Clock, MapPin, Ticket, Music, ExternalLink, Info, Share2 } from 'lucide-react'

// --- CONFIG ---
const EVENT = {
  name: 'Rocktober Fest 2025',
  date: '2025-10-18',
  doorsTimeLocal: '17:00',
  presenter: 'Ecalos Music Initiative',
  venueName: 'Rockwell Event Center',
  venueAddr: '16301 I-27, Canyon, TX 79015',
  cityState: 'Canyon, TX',
  heroTagline: 'Turning Canyon up to 11.',
  ticketUrl: 'https://example.com/tickets',
  rsvpUrl: 'https://facebook.com/events/your-event',
  contactEmail: 'info@rocktoberamarillo.com',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rockwell+Event+Center+16301+I-27+Canyon+TX+79015',
  posterUrl: '/rocktober.png',
  backgroundUrl: '/rocktober.png',
  lineupImageUrl: '/poster.png',
}

const LINEUP = {
  headliners: [
    'Divided Me',
    'Breaking Solace',
    'INSIDES',
    'Labor XII',
    'Black Tie Revolt',
  ],
  guests: [
    'The Light Superior',
    'Bardown',
    'Stealing Handshakes',
    'Ghosts of Gray County',
    'Sevity',
  ],
}

export default function App() {
  const doors = useMemo(() => new Date(`${EVENT.date}T${EVENT.doorsTimeLocal}:00`), [])
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const remaining = Math.max(0, doors.getTime() - now.getTime())
  const d = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const h = Math.floor((remaining / (1000 * 60 * 60)) % 24)
  const m = Math.floor((remaining / (1000 * 60)) % 60)
  const s = Math.floor((remaining / 1000) % 60)

  const localDate = useMemo(() => new Date(EVENT.date + 'T00:00:00'), [])

  const share = async () => {
    const text = `${EVENT.name} — ${formatDateRange(localDate)} @ ${EVENT.venueName}. Doors ${formatTime(EVENT.doorsTimeLocal)}. Tickets: ${EVENT.ticketUrl}`
    const url = typeof window !== 'undefined' ? window.location.href : undefined
    if (navigator.share) {
      try { await navigator.share({ title: EVENT.name, text, url }) } catch {}
    } else {
      await navigator.clipboard.writeText(text + (url ? `\n${url}` : ''))
      alert('Event details copied to clipboard!')
    }
  }

  return (
    <main
      className="min-h-screen text-neutral-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.85), rgba(10,10,10,0.95)), url(${EVENT.backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
    >
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        aria-label="Event hero"
        style={{
          backgroundImage: EVENT.posterUrl ? `linear-gradient(to bottom, rgba(10,10,10,.70), rgba(10,10,10,.95)), url(${EVENT.posterUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col items-center">
              <img 
                src="/rocklogo.png" 
                 alt="Rocktober 2025" 
                 className="w-[400px] md:w-[600px] object-contain"
              />
              <span className="block text-3xl md:text-5xl font-extrabold mt-2 text-orange-200">    {EVENT.cityState} • {localDate.getFullYear()}  </span>
            </div>

            <p className="max-w-2xl text-neutral-100 font-medium">{EVENT.heroTagline}</p>

            {/* Date / Time / Venue */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl mt-2">
              <InfoPill icon={<Calendar className="w-4 h-4 text-orange-300" />}>{formatDateRange(localDate)}</InfoPill>
              <InfoPill icon={<Clock className="w-4 h-4 text-orange-300" />}>Doors {formatTime(EVENT.doorsTimeLocal)}</InfoPill>
              <InfoPill icon={<MapPin className="w-4 h-4 text-orange-300" />}>{EVENT.venueName}</InfoPill>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a href={EVENT.ticketUrl} target="_blank" rel="noreferrer" className="rounded-2xl px-6 py-3 md:py-4 text-lg shadow-lg bg-orange-500 hover:bg-orange-600 transition inline-flex items-center gap-2">
                <Ticket className="w-5 h-5" /> Get Tickets
              </a>
              <a href={EVENT.mapUrl} target="_blank" rel="noreferrer" className="rounded-2xl px-6 py-3 md:py-4 text-lg bg-white/10 hover:bg-white/20 transition border border-white/10 inline-flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Directions
              </a>
              <button onClick={share} className="rounded-2xl px-6 py-3 md:py-4 text-lg border border-neutral-700 text-neutral-200 hover:bg-white/10 transition inline-flex items-center gap-2">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>

            {/* Countdown */}
            <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">
              {[{label: 'Days', value: d}, {label: 'Hours', value: h}, {label: 'Minutes', value: m}, {label: 'Seconds', value: s}].map(({label, value}) => (
                <div key={label} className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <div className="text-3xl font-bold tabular-nums text-orange-200">{String(value).padStart(2, '0')}</div>
                  <div className="text-xs uppercase tracking-wide text-neutral-200">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lineup */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="lineup">
        <header className="flex items-end justify-between mb-8">
          {/* Featured lineup image */}
            {EVENT.lineupImageUrl && (
            <img
              src={EVENT.lineupImageUrl}
              alt={EVENT.lineupImageAlt || "Lineup banner"}
              className="w-full max-w-5xl mx-auto mb-8 rounded-2xl shadow-lg object-cover"
              loading="lazy"
            />
            )}

          <div>
            <h2 id="lineup" className="text-3xl md:text-4xl font-extrabold text-orange-200">Lineup</h2>
            <p className="text-neutral-300">Subject to change.</p>
          </div>
          <a href={EVENT.rsvpUrl} target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition inline-flex items-center gap-2">
            RSVP <ExternalLink className="w-4 h-4" />
          </a>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white/5 border border-neutral-800 rounded-2xl">
            <div className="px-5 pt-5"><h3 className="flex items-center gap-2 text-orange-300 font-semibold"><Music className="w-5 h-5" /> Main Acts</h3></div>
            <div className="p-5">
              <ul className="space-y-2 text-xl font-semibold">
                {LINEUP.headliners.map((b) => (
                  <li key={b} className="border-b border-white/10 pb-2 last:border-none text-neutral-100">{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 border border-neutral-800 rounded-2xl">
            <div className="px-5 pt-5"><h3 className="flex items-center gap-2 text-orange-200 font-semibold"><Info className="w-5 h-5" /> Special Guests</h3></div>
            <div className="p-5">
              <ul className="flex flex-wrap gap-2">
                {LINEUP.guests.map((b) => (
                  <li key={b} className="rounded-xl bg-white/10 px-3 py-1 text-sm text-neutral-100">{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Venue & Info */}
      <section className="bg-white/5 border-y border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-orange-200">Venue</h3>
            <p className="text-neutral-100">{EVENT.venueName}</p>
            <address className="not-italic text-neutral-300">{EVENT.venueAddr}</address>
            <div className="mt-4 flex gap-3">
              <a href={EVENT.mapUrl} target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/20 transition inline-flex items-center gap-2">
                <MapPin className="w-4 h-4"/>Open in Maps
              </a>
              <a href={EVENT.ticketUrl} target="_blank" rel="noreferrer" className="rounded-xl px-4 py-2 bg-orange-500 hover:bg-orange-600 transition inline-flex items-center gap-2">
                <Ticket className="w-4 h-4"/>Buy Tickets
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3 text-orange-200">Quick Info</h3>
            <ul className="space-y-2 text-neutral-100">
              <li>• Doors at {formatTime(EVENT.doorsTimeLocal)} • All ages welcome (with guardian) • BYOB with ID 21+</li>
              <li>• Free on-site parking • Security screening at entry</li>
              <li>• No outside food/drink • Small bags only (subject to search)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="faq">
        <h3 id="faq" className="text-2xl font-bold mb-6 text-orange-200">FAQ</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {q: 'Where do I get tickets?', a: 'Use the Buy Tickets button above.'},
            {q: 'What time is the show?', a: `Doors at ${formatTime(EVENT.doorsTimeLocal)}; music shortly after.`},
            {q: 'Is there re-entry?', a: 'Re-entry permitted with wristband.'},
            {q: 'Refund policy?', a: 'All sales final unless the event is cancelled or rescheduled.'},
          ].map(({q, a}) => (
            <div key={q} className="bg-white/5 border border-neutral-800 rounded-2xl p-5">
              <div className="text-base text-neutral-100 font-semibold">{q}</div>
              <div className="text-neutral-300">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {EVENT.presenter}. All rights reserved.</p>
          <p>Questions? <a className="underline hover:text-white" href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a></p>
        </div>
      </footer>
    </main>
  )
}

function InfoPill({ icon, children }) {
  return (
    <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm flex items-center justify-center gap-2 border border-white/10 text-neutral-100">
      {icon}
      <span>{children}</span>
    </div>
  )
}

function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const d = new Date()
  d.setHours(h, m, 0, 0)
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function formatDateRange(d) {
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
