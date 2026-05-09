import { profile } from '../data/birthday-config.js'
import ConfettiAnimation from './confetti-animation.jsx'
import FloatingBalloons from './floating-balloons.jsx'

const RING_GRADIENT = 'conic-gradient(from 0deg, #00e5c3, #a855f7, #ff4fa1, #ffe066, #ff8c42, #00e5c3)'

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

        {/* Avatar with spinning rainbow ring */}
        <AnimatedText delay="0s" as="div" className="mb-10">
          <div className="relative" style={{ width: 168, height: 168 }}>
            {/* Spinning gradient ring */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                background: RING_GRADIENT,
                animation: 'spin-ring 3.5s linear infinite',
              }}
            />
            {/* Dark fill to create ring gap */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 3,
                borderRadius: '50%',
                background: '#0d0d1a',
              }}
            />
            {/* Avatar image */}
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              style={{
                position: 'absolute',
                inset: 7,
                width: 'calc(100% - 14px)',
                height: 'calc(100% - 14px)',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>
        </AnimatedText>

        {/* Happy Birthday label */}
        <AnimatedText
          delay="0.15s"
          className="text-accent-pink text-sm font-bold tracking-[0.3em] uppercase mb-3"
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

        {/* Age */}
        <AnimatedText
          delay="0.42s"
          className="text-accent-yellow text-2xl font-semibold mb-3"
        >
          <i className="fa-solid fa-party-popper" aria-hidden="true" /> Turning {profile.age} today!
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
            position: 'relative',
            width: '100%',
            maxWidth: '32rem',
          }}
        >
          {/* Pulsing gradient glow behind the card (no spin — avoids spinner look) */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '1.1rem',
              background: 'linear-gradient(135deg, #00e5c3, #a855f7, #ff4fa1, #ffe066)',
              filter: 'blur(10px)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />

          {/* Glass card */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.10)',
              borderRadius: '1rem',
              padding: '1.75rem 2rem',
              boxShadow: '0 8px 32px rgba(0,229,195,0.07), inset 0 1px 0 rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Animated sheen sweep — clips to card bounds */}
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
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
                  animation: 'glass-sheen 5s ease-in-out 1.5s infinite',
                }}
              />
            </div>

            {/* Decorative large quote mark */}
            <i
              className="fa-solid fa-quote-left"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '0.6rem',
                left: '0.9rem',
                fontSize: '2.8rem',
                color: 'rgba(0, 229, 195, 0.18)',
                lineHeight: 1,
              }}
            />

            {/* Message text */}
            <p
              className="text-white/80 text-lg italic leading-relaxed text-center"
              style={{ position: 'relative', zIndex: 1, paddingTop: '0.4rem' }}
            >
              {profile.message}
            </p>

            {/* Closing quote mark */}
            <i
              className="fa-solid fa-quote-right"
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: '0.6rem',
                right: '0.9rem',
                fontSize: '2.2rem',
                color: 'rgba(168, 85, 247, 0.18)',
                lineHeight: 1,
              }}
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
