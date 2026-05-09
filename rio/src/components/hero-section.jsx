import { useState, useEffect } from 'react'
import { profile } from '../data/birthday-config.js'
import ConfettiAnimation from './confetti-animation.jsx'
import FloatingBalloons from './floating-balloons.jsx'

// Counts up from 0 → target over ~1.2s, starting after a 0.6s delay
function AgeCounter({ age }) {
  const target = parseInt(age) || 0
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!target) return
    const stepMs = Math.max(60, Math.floor(1200 / target))
    let interval = null

    const timeout = setTimeout(() => {
      let current = 0
      interval = setInterval(() => {
        current += 1
        setDisplay(current)
        if (current >= target) clearInterval(interval)
      }, stepMs)
    }, 700)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [target])

  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="font-pacifico text-accent-teal"
        style={{ fontSize: 'clamp(4.5rem, 16vw, 7.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
      >
        {display || (target ? 0 : age)}
      </span>
      <span className="text-white/45 text-base italic tracking-widest">
        years young <span style={{ color: '#ffe066' }}>✦</span>
      </span>
    </div>
  )
}

// Staggered entrance: each item fades up with increasing delay
function AnimatedText({ delay, className, style: extraStyle, children, as: Tag = 'p' }) {
  return (
    <Tag
      className={className}
      style={{
        animation: `fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
        ...extraStyle,
      }}
    >
      {children}
    </Tag>
  )
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0d0d1a' }}
    >
      {/* Ambient gradient blooms */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 90% 55% at 50% 105%, rgba(0,229,195,0.18) 0%, transparent 70%)',
            'radial-gradient(ellipse 55% 45% at 18% 8%,  rgba(168,85,247,0.13) 0%, transparent 60%)',
            'radial-gradient(ellipse 45% 35% at 85% 5%,  rgba(255,79,161,0.10) 0%, transparent 55%)',
          ].join(', '),
        }}
      />

      <ConfettiAnimation />
      <FloatingBalloons />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-2xl">

        {/* Avatar — single teal glow ring */}
        <AnimatedText delay="0s" as="div" className="mb-10">
          <div
            style={{
              width: 176,
              height: 176,
              borderRadius: '50%',
              padding: 5,
              border: '2px solid rgba(0, 229, 195, 0.75)',
              background: '#0d0d1a',
              animation: 'pulse-avatar-ring 2.8s ease-in-out infinite',
            }}
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </AnimatedText>

        {/* Happy Birthday label */}
        <AnimatedText
          delay="0.15s"
          className="text-accent-teal text-sm font-bold tracking-[0.3em] uppercase mb-3"
        >
          <i className="fa-solid fa-cake-candles" aria-hidden="true" /> Happy Birthday <i className="fa-solid fa-cake-candles" aria-hidden="true" />
        </AnimatedText>

        {/* Name */}
        <AnimatedText
          as="h1"
          delay="0.28s"
          className="text-white font-black mb-4 font-pacifico"
          style={{ fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 1.05 }}
        >
          {profile.name}
        </AnimatedText>

        {/* Age — large count-up number */}
        <AnimatedText delay="0.42s" as="div" className="mb-4">
          <AgeCounter age={profile.age} />
        </AnimatedText>

        {/* Date */}
        <AnimatedText
          delay="0.56s"
          className="text-gray-400 text-base tracking-wider mb-10"
        >
          <i className="fa-regular fa-calendar-days" aria-hidden="true" /> {profile.birthdayDate}
        </AnimatedText>

        {/* Personal message — glassmorphism quote card */}
        <div
          style={{
            animation: 'fade-in-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.70s both',
            width: '100%',
            maxWidth: '32rem',
          }}
        >
          {/* Single glass card — teal border pulses, no external aura */}
          <div
            style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 229, 195, 0.30)',
              borderRadius: '1rem',
              padding: '1.75rem 2rem',
              overflow: 'hidden',
              animation: 'pulse-card-border 3s ease-in-out infinite',
            }}
          >
            {/* Sheen sweep */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '1rem', pointerEvents: 'none' }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  width: '40%',
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
                  animation: 'glass-sheen 6s ease-in-out 2s infinite',
                }}
              />
            </div>

            {/* Decorative quote marks */}
            <i
              className="fa-solid fa-quote-left"
              aria-hidden="true"
              style={{ position: 'absolute', top: '0.6rem', left: '0.9rem', fontSize: '2.6rem', color: 'rgba(0,229,195,0.15)', lineHeight: 1 }}
            />

            {/* Message text */}
            <p
              className="text-white/80 text-lg italic leading-relaxed text-center"
              style={{ position: 'relative', zIndex: 1, paddingTop: '0.4rem' }}
            >
              {profile.message}
            </p>

            <i
              className="fa-solid fa-quote-right"
              aria-hidden="true"
              style={{ position: 'absolute', bottom: '0.6rem', right: '0.9rem', fontSize: '2rem', color: 'rgba(0,229,195,0.12)', lineHeight: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 flex flex-col items-center gap-2 select-none"
        style={{ animation: 'bounce-scroll 2.2s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <span className="text-white/30 text-xs tracking-[0.25em] uppercase">Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3v14M4 11l6 6 6-6" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
