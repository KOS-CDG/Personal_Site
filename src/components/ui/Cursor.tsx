import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Cursor() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Laggy spring for the outer ring
  const springX = useSpring(mouseX, { damping: 24, stiffness: 220 });
  const springY = useSpring(mouseY, { damping: 24, stiffness: 220 });

  useEffect(() => {
    if (reduced) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    window.addEventListener('mousemove', move);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [mouseX, mouseY, visible, reduced]);

  // Don't render on touch/reduced-motion devices
  if (reduced || typeof window === 'undefined') return null;

  return (
    <>
      {/* Dot — snaps to cursor */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--green)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Ring — follows with spring lag */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovered ? 48 : 28,
          height: hovered ? 48 : 28,
          borderColor: hovered ? 'var(--green)' : 'rgba(255,255,255,0.3)',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="cursor-ring"
      >
        <style>{`
          .cursor-ring {
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.3);
            mix-blend-mode: difference;
          }
          @media (hover: none) { .cursor-ring { display: none; } }
        `}</style>
      </motion.div>
    </>
  );
}
