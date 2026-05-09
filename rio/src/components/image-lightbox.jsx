import { useEffect, useCallback } from 'react'
import { profile } from '../data/birthday-config.js'

const GLASS_STYLE = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
}

export default function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
  hasMore = false,
  totalCount,
}) {
  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [activeIndex])

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

  // Guard: briefly null during React 18 batch state update when loading more
  const img = images[activeIndex]
  if (!img) return null

  const isFirst         = activeIndex === 0
  const isLast          = activeIndex === images.length - 1
  const isEndWithMore   = isLast && hasMore     // next will load more batch
  const isAbsoluteEnd   = isLast && !hasMore    // truly last photo
  const displayTotal    = totalCount ?? images.length

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* ── Mobile: glassmorphism birthday banner ── */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 md:hidden"
        style={GLASS_STYLE}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 text-center">
          <p className="text-accent-teal text-[10px] font-bold tracking-[0.22em] uppercase">
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

      {/* ── Desktop: close button ── */}
      <button
        className="hidden md:block absolute top-4 right-5 text-white/70 hover:text-white text-3xl font-light leading-none transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* ── Prev button ── */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-5xl font-thin px-2 md:px-3 py-2 transition-all"
        style={{ color: isFirst ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)', cursor: isFirst ? 'default' : 'pointer' }}
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        aria-disabled={isFirst}
      >
        ‹
      </button>

      {/* ── Image ── */}
      <img
        src={img.url}
        alt={img.alt}
        className="max-h-[75vh] md:max-h-[85vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {/* ── Next button — adapts to batch state ── */}
      <div
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-5xl font-thin px-2 md:px-3 py-2 transition-all"
          style={{
            color: isAbsoluteEnd  ? 'rgba(255,255,255,0.15)'
                 : isEndWithMore  ? '#00e5c3'
                 :                  'rgba(255,255,255,0.6)',
            cursor: isAbsoluteEnd ? 'default' : 'pointer',
          }}
          onClick={() => onNext()}
          aria-label={isEndWithMore ? 'Load more photos' : 'Next image'}
          aria-disabled={isAbsoluteEnd}
        >
          ›
        </button>
        {/* "MORE" hint when next will load a new batch */}
        {isEndWithMore && (
          <span
            style={{ color: '#00e5c3', fontSize: '0.55rem', letterSpacing: '0.14em', fontWeight: 700 }}
          >
            MORE
          </span>
        )}
      </div>

      {/* ── Counter ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <p className="text-white/50 text-sm tracking-widest">
          {activeIndex + 1} / {displayTotal}
        </p>
        {/* Hint when at last loaded image but more exist */}
        {isEndWithMore && (
          <p style={{ color: '#00e5c3', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            tap › to load more photos
          </p>
        )}
        {isAbsoluteEnd && (
          <p className="text-white/25" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            end of gallery
          </p>
        )}
      </div>
    </div>
  )
}
