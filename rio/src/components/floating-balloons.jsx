// Fixed balloon positions — no Math.random to avoid re-render flicker
const BALLOONS = [
  { color: '#ff4fa1', x: '5%',  y: '10%', size: 56, delay: '0s',   duration: '4s' },
  { color: '#ffe066', x: '13%', y: '60%', size: 42, delay: '0.9s', duration: '5s' },
  { color: '#a855f7', x: '83%', y: '8%',  size: 52, delay: '0.4s', duration: '4.5s' },
  { color: '#00e5c3', x: '90%', y: '55%', size: 38, delay: '1.3s', duration: '3.8s' },
  { color: '#ff8c42', x: '3%',  y: '38%', size: 34, delay: '1.8s', duration: '5.2s' },
  { color: '#ff4fa1', x: '92%', y: '78%', size: 46, delay: '2.5s', duration: '4.2s' },
  { color: '#ffe066', x: '76%', y: '32%', size: 40, delay: '1.1s', duration: '4.8s' },
  { color: '#a855f7', x: '19%', y: '80%', size: 36, delay: '0.6s', duration: '5.5s' },
]

function BalloonSvg({ color, size }) {
  const w = size
  const h = Math.round(size * 1.45)
  const cx = w / 2
  const rx = cx - 4
  const ry = Math.round(rx * 1.07)

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Balloon body */}
      <ellipse cx={cx} cy={ry + 4} rx={rx} ry={ry} fill={color} opacity="0.88" />
      {/* Highlight glare */}
      <ellipse cx={cx - rx * 0.28} cy={ry - ry * 0.35} rx={rx * 0.22} ry={ry * 0.16} fill="rgba(255,255,255,0.35)" />
      {/* Knot at bottom */}
      <path
        d={`M${cx} ${ry * 2 + 6} Q${cx - 4} ${ry * 2 + 12} ${cx} ${ry * 2 + 17} Q${cx + 4} ${ry * 2 + 12} ${cx} ${ry * 2 + 6}`}
        fill={color}
        opacity="0.9"
      />
      {/* String */}
      <path
        d={`M${cx} ${ry * 2 + 17} Q${cx + 6} ${h - 14} ${cx - 4} ${h}`}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.2"
      />
    </svg>
  )
}

export default function FloatingBalloons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            animation: `float ${b.duration} ease-in-out ${b.delay} infinite`,
            opacity: 0.72,
          }}
        >
          <BalloonSvg color={b.color} size={b.size} />
        </div>
      ))}
    </div>
  )
}
