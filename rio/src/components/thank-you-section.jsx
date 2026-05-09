import { profile } from '../data/birthday-config.js'

const DECO_ICONS = [
  { icon: 'fa-heart',         color: '#ff4fa1', delay: '0s',    size: '1.5rem' },
  { icon: 'fa-star',          color: '#ffe066', delay: '0.3s',  size: '1.2rem' },
  { icon: 'fa-heart',         color: '#a855f7', delay: '0.6s',  size: '1rem'   },
  { icon: 'fa-birthday-cake', color: '#00e5c3', delay: '0.9s',  size: '1.4rem' },
  { icon: 'fa-star',          color: '#ff8c42', delay: '1.2s',  size: '1.1rem' },
  { icon: 'fa-heart',         color: '#ffe066', delay: '1.5s',  size: '1.3rem' },
]

export default function ThankYouSection() {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: '#0d0d1a' }}
    >
      {/* Gradient bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,79,161,0.12) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 10% 40%,  rgba(0,229,195,0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse 40% 30% at 90% 20%,  rgba(168,85,247,0.08) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* Gradient from gallery above */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, #111124, #0d0d1a)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">

        {/* Decorative floating icons row */}
        <div className="flex items-center gap-5 mb-10" aria-hidden="true">
          {DECO_ICONS.map((d, i) => (
            <i
              key={i}
              className={`fa-solid ${d.icon}`}
              style={{
                color: d.color,
                fontSize: d.size,
                animation: `float 3.5s ease-in-out ${d.delay} infinite`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        {/* Heading */}
        <h2
          className="font-pacifico text-white mb-5"
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 5rem)',
            lineHeight: 1.1,
            animation: 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both',
          }}
        >
          Thank You!
        </h2>

        {/* Subheading */}
        <p
          className="text-white/60 text-xl leading-relaxed mb-6"
          style={{ animation: 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both' }}
        >
          For joining my birthday party<br />and making it the best day ever
        </p>

        {/* Name + date */}
        <p
          className="text-accent-pink font-semibold text-lg tracking-wider mb-2"
          style={{ animation: 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s both' }}
        >
          <i className="fa-solid fa-heart mr-2" aria-hidden="true" />
          {profile.name}
          <i className="fa-solid fa-heart ml-2" aria-hidden="true" />
        </p>

        <p
          className="text-white/30 text-sm tracking-widest mb-12"
          style={{ animation: 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both' }}
        >
          <i className="fa-regular fa-calendar-days mr-2" aria-hidden="true" />
          {profile.birthdayDate}
        </p>

        {/* Divider */}
        <div
          className="w-24 h-px mb-10"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }}
          aria-hidden="true"
        />

        {/* See you next year */}
        <p className="text-white/25 text-base italic tracking-wider mb-16">
          ✨ See you next year! ✨
        </p>

        {/* Footer */}
        <footer className="text-white/20 text-xs tracking-widest uppercase">
          Made with <i className="fa-solid fa-heart text-accent-pink mx-1" aria-hidden="true" /> by ARTTRACK
        </footer>
      </div>
    </section>
  )
}
