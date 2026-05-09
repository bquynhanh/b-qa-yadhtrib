import { useEffect } from 'react'

// Fires a confetti burst on mount, then cleans up
export default function ConfettiAnimation() {
  useEffect(() => {
    let cancelled = false

    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return

      // Initial burst
      confetti({
        particleCount: 220,
        spread: 100,
        origin: { y: 0.45 },
        colors: ['#ff4fa1', '#ffe066', '#00e5c3', '#a855f7', '#ff8c42'],
      })

      // Second wave for extra flair
      setTimeout(() => {
        if (cancelled) return
        confetti({
          particleCount: 120,
          spread: 80,
          angle: 60,
          origin: { x: 0, y: 0.5 },
          colors: ['#ff4fa1', '#ffe066', '#00e5c3'],
        })
        confetti({
          particleCount: 120,
          spread: 80,
          angle: 120,
          origin: { x: 1, y: 0.5 },
          colors: ['#a855f7', '#ffe066', '#ff8c42'],
        })
      }, 600)
    }).catch(() => {})

    return () => { cancelled = true }
  }, [])

  return null
}
