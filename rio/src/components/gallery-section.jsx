import { useState, useCallback } from 'react'
import { galleryImages } from '../data/birthday-config.js'
import MasonryGrid from './masonry-grid.jsx'
import ImageLightbox from './image-lightbox.jsx'

const BATCH_SIZE = 20

export default function GallerySection() {
  const [activeIndex, setActiveIndex]   = useState(null)
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)

  const visibleImages = galleryImages.slice(0, visibleCount)
  const hasMore = visibleCount < galleryImages.length

  // Next: auto-loads next batch when at last visible image; no wrap at absolute end
  const handleNext = useCallback(() => {
    const isLast = activeIndex === visibleImages.length - 1
    if (isLast && hasMore) {
      setVisibleCount((c) => Math.min(c + BATCH_SIZE, galleryImages.length))
      setActiveIndex(activeIndex + 1) // React 18 batches both — index valid on next render
    } else if (!isLast) {
      setActiveIndex(activeIndex + 1)
    }
    // isLast && !hasMore → do nothing (no wrap)
  }, [activeIndex, visibleImages.length, hasMore])

  // Prev: no wrap at beginning
  const handlePrev = useCallback(() => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1)
  }, [activeIndex])

  const handleClose    = useCallback(() => setActiveIndex(null), [])
  const handleLoadMore = () => setVisibleCount((c) => Math.min(c + BATCH_SIZE, galleryImages.length))

  return (
    <section
      className="relative py-20 px-4"
      style={{ background: '#111124' }}
    >
      {/* Gradient transition from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, #0d0d1a, #111124)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section heading pill */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-[0.2em] uppercase text-white/60">
            <i className="fa-solid fa-party-popper" aria-hidden="true" />
            <span>Birthday Gallery</span>
          </div>
        </div>

        {/* Gallery or empty state */}
        {galleryImages.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4 text-white/30">
              <i className="fa-solid fa-camera" aria-hidden="true" />
            </p>
            <p className="text-white/40 text-lg">Photos coming soon</p>
            <p className="text-white/25 text-sm mt-2">
              Add image URLs to <code className="text-accent-teal/60">src/data/birthday-config.js</code>
            </p>
          </div>
        ) : (
          <>
            <MasonryGrid images={visibleImages} onImageClick={setActiveIndex} />

            {/* Load More */}
            {hasMore && (
              <div className="flex flex-col items-center mt-12 gap-3">
                <p className="text-white/30 text-sm tracking-wider">
                  Showing {visibleCount} of {galleryImages.length} photos
                </p>
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-accent-teal/40 text-accent-teal text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:bg-accent-teal/10 hover:border-accent-teal active:scale-95"
                >
                  <i className="fa-solid fa-images" aria-hidden="true" />
                  Load More
                </button>
              </div>
            )}

            {!hasMore && galleryImages.length > BATCH_SIZE && (
              <p className="text-center text-white/20 text-sm mt-10 tracking-wider">
                All {galleryImages.length} photos loaded
              </p>
            )}
          </>
        )}
      </div>

      <ImageLightbox
        images={visibleImages}
        activeIndex={activeIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
        hasMore={hasMore}
        totalCount={galleryImages.length}
      />
    </section>
  )
}
