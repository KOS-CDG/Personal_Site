import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { onClose: () => void; }

const W = 400, H = 600, G = 0.38, FLAP = -6.5;
const BW = 44, BH = 26, PW = 60, BASE_GAP = 160, MIN_GAP = 100;
const BASE_SPD = 2.2, MAX_SPD = 4.5, PIPE_SP = 220;

function drawBar(ctx: CanvasRenderingContext2D, x: number, y: number, a: number) {
  ctx.save(); ctx.translate(x + BW/2, y + BH/2); ctx.rotate(a);
  const g = ctx.createLinearGradient(-BW/2, -BH/2, -BW/2, BH/2);
  g.addColorStop(0,'#f5d67b'); g.addColorStop(0.3,'#c8a96e');
  g.addColorStop(0.7,'#a07d3c'); g.addColorStop(1,'#c8a96e');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-BW/2+4,-BH/2); ctx.lineTo(BW/2-4,-BH/2);
  ctx.lineTo(BW/2,BH/2); ctx.lineTo(-BW/2,BH/2); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(120,80,20,0.5)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(-BW/2+4,-BH/2); ctx.lineTo(BW/2-4,-BH/2);
  ctx.lineTo(BW/2,BH/2); ctx.lineTo(-BW/2,BH/2); ctx.closePath(); ctx.stroke();
  ctx.strokeStyle='rgba(255,255,220,0.5)'; ctx.beginPath();
  ctx.moveTo(-BW/2+8,-BH/2+5); ctx.lineTo(BW/2-8,-BH/2+5); ctx.stroke();
  const wy = Math.sin(Date.now()/80)*3;
  ctx.fillStyle='rgba(255,255,220,0.7)';
  ctx.beginPath(); ctx.moveTo(-BW/2,-2+wy); ctx.lineTo(-BW/2-12,-8+wy); ctx.lineTo(-BW/2-2,4+wy); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(BW/2,-2+wy); ctx.lineTo(BW/2+12,-8+wy); ctx.lineTo(BW/2+2,4+wy); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawPipes(ctx: CanvasRenderingContext2D, x: number, topH: number, gap: number) {
  const g1='#1a5c2a', g2='#0d3d16', g3='#2d8c4a';
  const drawStack = (startY: number, endY: number) => {
    for (let by = startY; by < endY; by += 20) {
      const bh = Math.min(20, endY - by);
      const gr = ctx.createLinearGradient(x,by,x+PW,by);
      gr.addColorStop(0,g1); gr.addColorStop(0.5,g3); gr.addColorStop(1,g2);
      ctx.fillStyle=gr; ctx.fillRect(x,by,PW,bh-1);
      ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.fillRect(x+PW/2-5,by+2,10,bh-4);
      if(bh>12){ctx.fillStyle='rgba(255,255,255,0.2)';ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillText('$',x+PW/2,by+bh/2+4);}
    }
  };
  drawStack(0, topH); drawStack(topH + gap, H);
  ctx.fillStyle=g3; ctx.fillRect(x-4,topH-8,PW+8,8); ctx.fillRect(x-4,topH+gap,PW+8,8);
}

export default function FlappyGoldBar({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gRef = useRef({ barY:H/2-BH/2, vel:0, pipes:[] as {x:number;topH:number;scored:boolean}[], score:0, over:false, on:false, f:0 });
  const animRef = useRef(0);
  const [score, setScore] = useState(0);

  const spd = useCallback(() => Math.min(BASE_SPD + gRef.current.score*0.08, MAX_SPD), []);
  const gap = useCallback(() => Math.max(BASE_GAP - gRef.current.score*3, MIN_GAP), []);

  const spawn = useCallback(() => {
    const g2 = gap(), min=60, max=H-g2-60;
    const topH = min + Math.random()*(max-min);
    const last = gRef.current.pipes[gRef.current.pipes.length-1];
    gRef.current.pipes.push({ x: last ? last.x+PIPE_SP : W+60, topH, scored:false });
  }, [gap]);

  const reset = useCallback(() => {
    const g = gRef.current;
    Object.assign(g, { barY:H/2-BH/2, vel:0, pipes:[], score:0, over:false, on:false, f:0 });
    setScore(0);
    for(let i=0;i<3;i++) spawn();
  }, [spawn]);

  const flap = useCallback(() => {
    const g = gRef.current;
    if(g.over){ reset(); return; }
    if(!g.on){ g.on=true; }
    g.vel = FLAP;
  }, [reset]);

  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return;
    const ctx = canvas.getContext('2d')!;
    reset();
    const loop = () => {
      const g = gRef.current, s=spd(), gp=gap();
      if(g.on && !g.over){
        g.vel+=G; g.barY+=g.vel; g.f++;
        for(const p of g.pipes) p.x-=s;
        for(const p of g.pipes) if(!p.scored && p.x+PW<80){ p.scored=true; g.score++; setScore(g.score); }
        if(g.pipes.length>0 && g.pipes[0].x<-PW) g.pipes.shift();
        const last=g.pipes[g.pipes.length-1];
        if(!last || last.x < W-PIPE_SP+40){ const min=60,max=H-gp-60; g.pipes.push({x:W+20,topH:min+Math.random()*(max-min),scored:false}); }
        const bL=80,bR=80+BW,bT=g.barY,bB=g.barY+BH;
        if(bT<0||bB>H){g.over=true;}
        for(const p of g.pipes) if(bR>p.x&&bL<p.x+PW&&(bT<p.topH||bB>p.topH+gp)){g.over=true;}
      }
      const bg=ctx.createLinearGradient(0,0,0,H);
      bg.addColorStop(0,'#0a1628'); bg.addColorStop(1,'#060d1a');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle='rgba(126,184,247,0.04)'; ctx.lineWidth=0.5;
      for(let y=0;y<H;y+=30){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      for(let x=0;x<W;x+=30){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(const p of g.pipes) drawPipes(ctx,p.x,p.topH,gp);
      drawBar(ctx,80,g.barY,Math.max(-0.4,Math.min(g.vel*0.04,0.6)));
      ctx.fillStyle='rgba(200,169,110,0.9)'; ctx.font='bold 36px "Syne",sans-serif'; ctx.textAlign='center';
      ctx.fillText(String(g.score),W/2,50);
      if(!g.on){ctx.fillStyle='rgba(200,169,110,0.6)';ctx.font='14px "Outfit",sans-serif';ctx.fillText('Tap or press Space to start',W/2,H/2+60);}
      if(g.over){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#c8a96e';ctx.font='bold 32px "Syne",sans-serif';ctx.fillText('Game Over',W/2,H/2-30);ctx.fillStyle='rgba(200,169,110,0.8)';ctx.font='18px "Outfit",sans-serif';ctx.fillText(`Score: ${g.score}`,W/2,H/2+10);ctx.fillStyle='rgba(200,169,110,0.5)';ctx.font='13px "Outfit",sans-serif';ctx.fillText('Tap to Restart',W/2,H/2+45);}
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [reset, spd, gap]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if(e.code==='Space'){e.preventDefault();flap();} if(e.code==='Escape')onClose(); };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  }, [flap, onClose]);

  return (
    <motion.div className="flappy-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
      <div className="flappy-overlay__bg" onClick={onClose}/>
      <motion.div className="flappy-wrap" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} transition={{duration:0.35,ease:[0.34,1.56,0.64,1]}}>
        <button className="flappy-x" onClick={onClose} aria-label="Close game">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
        </button>
        <div className="flappy-hdr"><span className="flappy-t">Flappy Gold Bar</span><span className="flappy-s">Score: {score}</span></div>
        <canvas ref={canvasRef} width={W} height={H} className="flappy-c" onClick={flap} onTouchStart={()=>{flap();}}/>
      </motion.div>
      <style>{`
        .flappy-overlay{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;padding:20px;}
        .flappy-overlay__bg{position:absolute;inset:0;background:rgba(6,13,26,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
        .flappy-wrap{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;}
        .flappy-x{position:absolute;top:-8px;right:-8px;width:32px;height:32px;border-radius:50%;background:rgba(200,169,110,0.12);border:1px solid rgba(200,169,110,0.25);color:#c8a96e;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background 0.2s,transform 0.2s;}
        .flappy-x:hover{background:rgba(200,169,110,0.25);transform:scale(1.1);}
        .flappy-hdr{display:flex;align-items:center;justify-content:space-between;width:${W}px;padding:12px 16px;background:#0d1829;border:1px solid rgba(200,169,110,0.15);border-bottom:none;border-radius:8px 8px 0 0;}
        .flappy-t{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#c8a96e;letter-spacing:-0.01em;}
        .flappy-s{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(200,169,110,0.6);letter-spacing:0.06em;}
        .flappy-c{display:block;border:1px solid rgba(200,169,110,0.15);border-radius:0 0 8px 8px;cursor:pointer;max-width:100%;touch-action:none;}
      `}</style>
    </motion.div>
  );
}
