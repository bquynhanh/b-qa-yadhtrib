import { useState } from 'react'

function MasonryItem({ img, index, onImageClick }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="masonry-item photo-card" onClick={() => onImageClick(index)}>

      {/* Skeleton placeholder — shown while image fetches */}
      {!loaded && (
        <div className="skeleton-shimmer" style={{ height: 220 }} aria-hidden="true" />
      )}

      {loaded ? (
        // Loaded: render inside hover-capable wrapper with overlay
        <div className="photo-card-inner">
          <img src={img.url} alt={img.alt} />
          <div className="photo-hover-overlay" aria-hidden="true">
            <div className="photo-hover-gradient" />
            <div className="photo-hover-expand">
              <i className="fa-solid fa-expand" />
            </div>
          </div>
        </div>
      ) : (
        // Not loaded: invisible img keeps lazy-load intersection working
        <img
          src={img.url}
          alt={img.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%' }}
        />
      )}
    </div>
  )
}

export default function MasonryGrid({ images, onImageClick }) {
  return (
    <div className="masonry-grid">
      {images.map((img, index) => (
        <MasonryItem key={img.id} img={img} index={index} onImageClick={onImageClick} />
      ))}
    </div>
  )
}
