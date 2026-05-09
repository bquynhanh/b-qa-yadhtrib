import { useEffect, useCallback } from 'react'
import { profile } from '../data/birthday-config.js'

const GLASS_STYLE = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
}

export default function ImageLightbox({ images, activeIndex, onClose, onNext, onPrev }) {
  // Lock body scroll while open
  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [activeIndex])

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft')  onPrev()
    if (e.key === 'Escape')     onClose()
  }, [onNext, onPrev, onClose])

  useEffect(() => {
    if (activeIndex === null) return
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [activeIndex, handleKey])

  if (activeIndex === null) return null

  const img = images[activeIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* ── Mobile: glassmorphism birthday banner (hidden on md+) ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 md:hidden"
        style={GLASS_STYLE}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 text-center">
          <p className="text-accent-pink text-[10px] font-bold tracking-[0.22em] uppercase">
            <i className="fa-solid fa-cake-candles" aria-hidden="true" /> Happy Birthday <i className="fa-solid fa-cake-candles" aria-hidden="true" />
          </p>
          <p className="text-white font-pacifico text-xl leading-tight mt-0.5">{profile.name}</p>
        </div>
        <button
          className="text-white/60 hover:text-white text-2xl font-light ml-3 transition-colors shrink-0"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* ── Desktop: standalone close button (hidden on mobile) ── */}
      <button
        className="hidden md:block absolute top-4 right-5 text-white/70 hover:text-white text-3xl font-light leading-none transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev button */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-thin transition-colors px-2 md:px-3 py-2"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={img.url}
        alt={img.alt}
        className="max-h-[75vh] md:max-h-[85vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next button */}
      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl font-thin transition-colors px-2 md:px-3 py-2"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        ›
      </button>

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
        {activeIndex + 1} / {images.length}
      </p>
    </div>
  )
}
