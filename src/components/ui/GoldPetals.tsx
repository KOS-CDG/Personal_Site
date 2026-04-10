import { useRef } from 'react';
import { useTheme } from '../../App';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const PETAL_COUNT = 22;

interface Petal {
  id: number;
  x: number;         // vw start
  delay: number;     // s
  duration: number;  // s
  size: number;      // px
  opacity: number;
  rotation: number;  // initial deg
  drift: number;     // vw horizontal drift
}

function generatePetals(): Petal[] {
  return Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: -(Math.random() * 18),     // negative = already mid-fall on load
    duration: 14 + Math.random() * 10,
    size: 6 + Math.random() * 14,
    opacity: 0.12 + Math.random() * 0.22,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 12,
  }));
}

const petals = generatePetals();

export default function GoldPetals() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  if (theme !== 'navy' || reduced) return null;

  return (
    <div
      ref={containerRef}
      className="gold-petals"
      aria-hidden="true"
    >
      {petals.map(p => (
        <div
          key={p.id}
          className="gold-petal"
          style={{
            left: `${p.x}vw`,
            width: `${p.size}px`,
            height: `${p.size * 0.55}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--petal-drift': `${p.drift}vw`,
            '--petal-rot': `${p.rotation}deg`,
          } as React.CSSProperties}
        />
      ))}

      <style>{`
        .gold-petals {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .gold-petal {
          position: absolute;
          top: -40px;
          border-radius: 50% 0 50% 0;
          background: linear-gradient(135deg, #d4a94c 0%, #c8a96e 40%, #e8c97a 70%, #b8882e 100%);
          animation: petal-fall linear infinite both;
          will-change: transform, opacity;
        }

        @keyframes petal-fall {
          0% {
            transform:
              translateY(-40px)
              translateX(0)
              rotate(var(--petal-rot, 0deg))
              scale(1);
            opacity: inherit;
          }
          25% {
            transform:
              translateY(25vh)
              translateX(calc(var(--petal-drift, 0vw) * 0.4))
              rotate(calc(var(--petal-rot, 0deg) + 80deg))
              scale(0.95);
          }
          50% {
            transform:
              translateY(50vh)
              translateX(calc(var(--petal-drift, 0vw) * 0.7))
              rotate(calc(var(--petal-rot, 0deg) + 180deg))
              scale(0.9);
          }
          75% {
            transform:
              translateY(75vh)
              translateX(var(--petal-drift, 0vw))
              rotate(calc(var(--petal-rot, 0deg) + 260deg))
              scale(0.85);
          }
          100% {
            transform:
              translateY(110vh)
              translateX(calc(var(--petal-drift, 0vw) * 1.1))
              rotate(calc(var(--petal-rot, 0deg) + 360deg))
              scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
