// src/pages/Rules.jsx
import { Link } from "react-router-dom"

const EVENT = {
  backgroundUrl: "/rocktober.png",
  ticketUrl: "https://tearstubs.com/event/592",
  contactEmail: "contact@ecalosmusicinitiative.org",
}

export default function Rules() {
  return (
    <main
      className="min-h-screen text-neutral-100"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,0.6)), url(${EVENT.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between text-sm">
          <Link to="/" className="font-semibold text-orange-200 hover:text-white">← Back to Home</Link>
          <a href={EVENT.ticketUrl} target="_blank" rel="noreferrer" className="hover:underline">Tickets</a>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-200 mb-6">Rules & Important Information</h1>

        <RuleCard title="General Rules">
          <ul className="list-disc ml-5 space-y-1 text-neutral-100">
            <li>No outside food or beverages.</li>
            <li>All bags subject to search (small bags only).</li>
            <li>No weapons, drugs, or illegal substances.</li>
            <li>Be respectful to staff, artists, and attendees.</li>
          </ul>
        </RuleCard>

        <RuleCard title="Entry & Re-Entry">
          <ul className="list-disc ml-5 space-y-1 text-neutral-100">
            <li>All ages welcome; under 16 with a guardian.</li>
            <li>Valid government ID required for 18+ wristbands.</li>
            <li>Re-entry permitted with intact wristband and stamp.</li>
          </ul>
        </RuleCard>

        <RuleCard title="Tickets & Refunds">
          <ul className="list-disc ml-5 space-y-1 text-neutral-100">
            <li>All sales final unless cancelled or rescheduled.</li>
            <li>Official tickets only via <a className="underline" href={EVENT.ticketUrl} target="_blank" rel="noreferrer">TearStubs</a>.</li>
            <li>We can’t verify third-party resale tickets.</li>
          </ul>
        </RuleCard>

        <div className="mt-10 text-sm text-neutral-400">
          Questions? <a className="underline hover:text-white" href={`mailto:${EVENT.contactEmail}`}>{EVENT.contactEmail}</a>
        </div>
      </section>
    </main>
  )
}

function RuleCard({ title, children }) {
  return (
    <div className="bg-white/5 border border-neutral-800 rounded-2xl p-5 mb-6">
      <h2 className="text-xl font-bold mb-3 text-orange-200">{title}</h2>
      <div className="text-neutral-300">{children}</div>
    </div>
  )
}
