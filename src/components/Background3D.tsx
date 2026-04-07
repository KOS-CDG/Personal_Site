import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  size: number; opacity: number; color: string;
}

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  radius: number; color: string;
  opacity: number; phase: number; speed: number;
}

// ── Matrix rain character stream ─────────────────────────────
interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
  length: number;
}

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()=+-*&^%$#@!?;:'.split('');

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const rafRef = useRef<number>(0);
  const matrixRafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // ── Matrix rain effect (dark mode only) ──────────────────
  useEffect(() => {
    if (reduced) return;
    const canvas = matrixRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    const colWidth = 18;
    const colCount = Math.ceil(W / colWidth);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const columns: MatrixColumn[] = Array.from({ length: colCount }, (_, i) => ({
      x: i * colWidth,
      y: rand(-H, 0),
      speed: rand(0.8, 2.2),
      chars: Array.from({ length: Math.floor(rand(8, 24)) }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ),
      opacity: rand(0.03, 0.12),
      length: Math.floor(rand(8, 24)),
    }));

    let t = 0;

    const drawMatrix = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme !== 'dark') {
        matrixRafRef.current = requestAnimationFrame(drawMatrix);
        return;
      }

      t++;
      ctx.clearRect(0, 0, W, H);

      columns.forEach(col => {
        col.y += col.speed;
        if (col.y > H + col.length * colWidth) {
          col.y = rand(-200, -50);
          col.speed = rand(0.8, 2.2);
          col.opacity = rand(0.03, 0.12);
          col.chars = Array.from({ length: col.length }, () =>
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          );
        }

        // Mutate leading char occasionally
        if (t % 8 === 0) {
          col.chars[0] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }

        col.chars.forEach((ch, i) => {
          const y = col.y - i * colWidth;
          if (y < -colWidth || y > H + colWidth) return;

          const fadeRatio = 1 - i / col.length;
          let alpha: number;
          let color: string;

          if (i === 0) {
            // Leading character: bright white-green
            alpha = col.opacity * 8;
            color = `rgba(200, 255, 200, ${Math.min(alpha, 0.9)})`;
          } else {
            alpha = col.opacity * fadeRatio * 4;
            color = `rgba(0, 255, 70, ${Math.min(alpha, 0.55)})`;
          }

          ctx.font = `${colWidth - 2}px "JetBrains Mono", monospace`;
          ctx.fillStyle = color;
          ctx.fillText(ch, col.x, y);
        });
      });

      matrixRafRef.current = requestAnimationFrame(drawMatrix);
    };

    matrixRafRef.current = requestAnimationFrame(drawMatrix);

    return () => {
      cancelAnimationFrame(matrixRafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  // ── Main particle / orb background ──────────────────────
  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / W, y: e.clientY / H };
    };
    window.addEventListener('mousemove', onMouse);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const getTheme = () =>
      document.documentElement.getAttribute('data-theme') || 'dark';

    let currentAccent = { r: 34, g: 197, b: 94 };

    const getPalette = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--section-accent').trim() || '#22c55e';

      let target = { r: 34, g: 197, b: 94 };
      if (raw.startsWith('#') && raw.length >= 7) target = hexToRgb(raw);

      currentAccent.r += (target.r - currentAccent.r) * 0.015;
      currentAccent.g += (target.g - currentAccent.g) * 0.015;
      currentAccent.b += (target.b - currentAccent.b) * 0.015;

      const { r, g, b } = currentAccent;
      const theme = getTheme();

      // Theme-specific palette adjustments
      if (theme === 'light') {
        return {
          particle: [
            `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},alpha)`,
            `rgba(100,150,200,alpha)`,
          ],
          orb1: `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.025)`,
          orb2: `rgba(100,150,200,0.02)`,
          orb3: `rgba(180,180,220,0.015)`,
          line: `rgba(0,0,0,0.02)`,
          partOp: 0.3,
          particleCount: 0.4, // multiplier for light mode (fewer particles)
        };
      }

      if (theme === 'navy') {
        return {
          particle: [
            `rgba(126,184,247,alpha)`,
            `rgba(148,103,255,alpha)`,
            `rgba(100,220,200,alpha)`,
            `rgba(200,169,110,alpha)`,
          ],
          orb1: `rgba(126,184,247,0.06)`,
          orb2: `rgba(148,103,255,0.04)`,
          orb3: `rgba(100,220,200,0.03)`,
          line: `rgba(126,184,247,0.04)`,
          partOp: 0.7,
          particleCount: 1,
        };
      }

      // Dark / terminal
      const baseOp = 0.06;
      return {
        particle: [
          `rgba(0,255,70,alpha)`,
          `rgba(0,200,60,alpha)`,
          `rgba(56,189,248,alpha)`,
        ],
        orb1: `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${baseOp})`,
        orb2: `rgba(0,180,50,${baseOp * 0.6})`,
        orb3: `rgba(56,189,248,${baseOp * 0.4})`,
        line: `rgba(0,255,70,${baseOp * 0.4})`,
        partOp: 0.65,
        particleCount: 1,
      };
    };

    const COUNT = Math.min(Math.floor((W * H) / 12000), 90);
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const pal = getPalette();
      const col = pal.particle[Math.floor(rand(0, pal.particle.length))];
      return {
        x: rand(0, W), y: rand(0, H),
        z: rand(0.1, 1),
        vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18), vz: rand(-0.003, 0.003),
        size: rand(1, 3),
        opacity: rand(0.2, 0.7),
        color: col,
      };
    });

    const orbs: Orb[] = Array.from({ length: 5 }, (_, i) => ({
      x: rand(0.1, 0.9) * W, y: rand(0.1, 0.9) * H,
      vx: rand(-0.15, 0.15), vy: rand(-0.12, 0.12),
      radius: rand(180, 380),
      color: '',
      opacity: rand(0.04, 0.10),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.003, 0.007) * (i % 2 === 0 ? 1 : -1),
    }));

    const lines: { x1: number; y1: number; x2: number; y2: number; op: number; speed: number; phase: number }[] =
      Array.from({ length: 18 }, () => ({
        x1: rand(0, W), y1: rand(0, H),
        x2: rand(0, W), y2: rand(0, H),
        op: rand(0.015, 0.06),
        speed: rand(0.0005, 0.0015),
        phase: rand(0, Math.PI * 2),
      }));

    let t = 0;

    const draw = () => {
      t += 0.004;
      const pal = getPalette();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      // Floating orbs
      const orbColors = [pal.orb1, pal.orb2, pal.orb3, pal.orb1, pal.orb2];
      orbs.forEach((orb, i) => {
        orb.color = orbColors[i % orbColors.length];
        orb.x += orb.vx + Math.sin(t * 0.5 + orb.phase) * 0.4;
        orb.y += orb.vy + Math.cos(t * 0.4 + orb.phase) * 0.3;
        if (orb.x < -orb.radius) orb.x = W + orb.radius;
        if (orb.x > W + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = H + orb.radius;
        if (orb.y > H + orb.radius) orb.y = -orb.radius;

        const px = (mx - 0.5) * 30;
        const py = (my - 0.5) * 30;

        const grad = ctx.createRadialGradient(
          orb.x + px, orb.y + py, 0,
          orb.x + px, orb.y + py, orb.radius
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');
        ctx.globalAlpha = orb.opacity * (0.85 + 0.15 * Math.sin(t + orb.phase));
        ctx.beginPath();
        ctx.arc(orb.x + px, orb.y + py, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Depth lines
      ctx.strokeStyle = pal.line;
      lines.forEach(ln => {
        const pulse = Math.sin(t * ln.speed * 400 + ln.phase);
        ctx.globalAlpha = ln.op * (0.6 + 0.4 * pulse);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      // Particles
      particles.forEach(p => {
        const parallaxX = (mx - 0.5) * 60 * p.z;
        const parallaxY = (my - 0.5) * 40 * p.z;
        const perspective = lerp(0.5, 1.5, p.z);
        const px = p.x + parallaxX;
        const py = p.y + parallaxY;
        const sSize = p.size * perspective;

        p.x += p.vx * perspective;
        p.y += p.vy * perspective;
        p.z += p.vz;
        p.z = Math.max(0.1, Math.min(1, p.z));

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(t * 1.2 + p.z * 10));
        const col = p.color.replace('alpha', alpha.toFixed(2));

        if (p.z > 0.7) {
          ctx.shadowBlur = 8 * p.z;
          ctx.shadowColor = col;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(px, py, sSize, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Connection lines between nearby particles
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i], pj = particles[j];
          const dx = pi.x - pj.x, dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.06 * Math.min(pi.z, pj.z);
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = pal.line;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <>
      {/* Matrix rain canvas — visible only in dark mode via CSS */}
      <canvas
        ref={matrixRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.55,
        }}
      />
      {/* Main particle / orb canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.85,
        }}
      />
    </>
  );
}
