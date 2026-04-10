import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props { onClose: () => void; }

type Cell = 'X' | 'O' | null;
type Board = Cell[];

const WIN_LINES = [
  // Rows (2 per row)
  [0, 1, 2], [1, 2, 3],
  [4, 5, 6], [5, 6, 7],
  [8, 9, 10], [9, 10, 11],
  [12, 13, 14], [13, 14, 15],
  // Cols (2 per col)
  [0, 4, 8], [4, 8, 12],
  [1, 5, 9], [5, 9, 13],
  [2, 6, 10], [6, 10, 14],
  [3, 7, 11], [7, 11, 15],
  // Diagonals \
  [0, 5, 10], [5, 10, 15], [1, 6, 11], [4, 9, 14],
  // Diagonals /
  [3, 6, 9], [6, 9, 12], [2, 5, 8], [7, 10, 13]
];

const WIN_MSGS = [
  "You're unstoppable!",
  "Too smart for me!",
  "Genius move!",
  "Unbeatable!",
  "Master strategist!",
  "I never stood a chance!",
  "Brilliant play!",
  "You crushed it!",
];

function checkWin(board: Board, player: Cell): number[] | null {
  for (const line of WIN_LINES) {
    if (line.every(i => board[i] === player)) return line;
  }
  return null;
}

function isFull(board: Board): boolean {
  return board.every(c => c !== null);
}

const MOVE_ORDER = [5, 6, 9, 10, 0, 3, 12, 15, 1, 2, 4, 7, 8, 11, 13, 14];

function evaluateBoard(board: Board): number {
  let score = 0;
  for (const line of WIN_LINES) {
    let xCount = 0;
    let oCount = 0;
    for (const idx of line) {
      if (board[idx] === 'X') xCount++;
      else if (board[idx] === 'O') oCount++;
    }
    // Heavy penalties/rewards for 2-in-a-row (immediate threat)
    if (xCount > 0 && oCount === 0) {
      score -= xCount === 2 ? 1000 : 10;
    }
    if (oCount > 0 && xCount === 0) {
      score += oCount === 2 ? 1000 : 10;
    }
  }
  return score;
}

// Unbeatable AI using Minimax with Alpha-Beta Pruning, Move Ordering, and Depth Limiting
function minimax(board: Board, depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
  if (checkWin(board, 'O')) return 10000 - depth;
  if (checkWin(board, 'X')) return depth - 10000;
  if (isFull(board)) return 0;
  if (depth >= 7) return evaluateBoard(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (const i of MOVE_ORDER) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, alpha, beta, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (const i of MOVE_ORDER) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, alpha, beta, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let move = -1;
  const empty = board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);
  if (empty.length === 0) return -1;

  // Optimization for the very first move to prevent slow search on empty board
  if (empty.length >= 15) {
     const availableCenters = [5, 6, 9, 10].filter(i => empty.includes(i));
     if (availableCenters.length > 0) return availableCenters[Math.floor(Math.random() * availableCenters.length)];
  }

  const testBoard = [...board];
  for (const i of MOVE_ORDER) {
    if (testBoard[i] === null) {
      testBoard[i] = 'O';
      const score = minimax(testBoard, 0, -Infinity, Infinity, false);
      testBoard[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

export default function TicTacToe({ onClose }: Props) {
  const [board, setBoard] = useState<Board>(Array(16).fill(null));
  const [winLine, setWinLine] = useState<number[] | null>(null);
  const [winMsg, setWinMsg] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [xTurn, setXTurn] = useState(false); // Bot moves first

  const restart = useCallback(() => {
    setBoard(Array(16).fill(null));
    setWinLine(null);
    setWinMsg('');
    setGameOver(false);
    setXTurn(false);
  }, []);

  const handleClick = useCallback((idx: number) => {
    if (board[idx] || gameOver || !xTurn) return;
    const next = [...board];
    next[idx] = 'X';
    setBoard(next);

    const win = checkWin(next, 'X');
    if (win) {
      setWinLine(win);
      setWinMsg(WIN_MSGS[Math.floor(Math.random() * WIN_MSGS.length)]);
      setGameOver(true);
      return;
    }
    if (isFull(next)) { setGameOver(true); return; }
    setXTurn(false);
  }, [board, gameOver, xTurn]);

  // AI move (delayed for feel)
  useEffect(() => {
    if (xTurn || gameOver) return;
    const timer = setTimeout(() => {
      const move = getBestMove(board);
      if (move < 0) return;
      const next = [...board];
      next[move] = 'O';
      setBoard(next);

      const win = checkWin(next, 'O');
      if (win) { setWinLine(win); setGameOver(true); return; }
      if (isFull(next)) { setGameOver(true); return; }
      setXTurn(true);
    }, 400 + Math.random() * 300);
    return () => clearTimeout(timer);
  }, [xTurn, gameOver, board]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.code === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <motion.div className="ttt-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
      <div className="ttt-overlay__bg" onClick={onClose}/>
      <motion.div className="ttt-wrap" initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}} transition={{duration:0.35,ease:[0.34,1.56,0.64,1]}}>
        <button className="ttt-x" onClick={onClose} aria-label="Close game">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
        </button>

        <div className="ttt-terminal">
          <div className="ttt-bar">
            <span className="ttt-dot ttt-dot--r"/><span className="ttt-dot ttt-dot--y"/><span className="ttt-dot ttt-dot--g"/>
            <span className="ttt-bar__title">~/games/tic-tac-toe</span>
          </div>
          <div className="ttt-body">
            <div className="ttt-prompt">&gt; Tic-Tac-Toe // You are X (I go first)</div>

            <div className="ttt-grid">
              {board.map((cell, i) => (
                <button
                  key={i}
                  className={`ttt-cell ${cell ? 'ttt-cell--filled' : ''} ${winLine?.includes(i) ? 'ttt-cell--win' : ''}`}
                  onClick={() => handleClick(i)}
                  disabled={!!cell || gameOver || !xTurn}
                  aria-label={`Cell ${i+1}: ${cell || 'empty'}`}
                >
                  {cell && <span className={`ttt-mark ttt-mark--${cell.toLowerCase()}`}>{cell}</span>}
                </button>
              ))}
            </div>

            {!xTurn && !gameOver && (
              <div className="ttt-thinking">
                <span className="ttt-thinking__dot">.</span>
                <span className="ttt-thinking__dot">.</span>
                <span className="ttt-thinking__dot">.</span>
                {' '}thinking
              </div>
            )}

            {gameOver && winMsg && (
              <motion.div className="ttt-result" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
                <span className="ttt-result__msg">&gt; {winMsg}</span>
              </motion.div>
            )}

            {gameOver && !winMsg && (
              <motion.div className="ttt-result" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
                <span className="ttt-result__msg">&gt; Draw. Impressive.</span>
              </motion.div>
            )}

            {gameOver && (
              <button className="ttt-restart" onClick={restart}>
                Play Again
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <style>{`
        .ttt-overlay{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;justify-content:center;padding:20px;}
        .ttt-overlay__bg{position:absolute;inset:0;background:rgba(5,5,5,0.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);}
        .ttt-wrap{position:relative;z-index:2;}
        .ttt-x{position:absolute;top:-8px;right:-8px;width:32px;height:32px;border-radius:50%;background:rgba(0,255,70,0.08);border:1px solid rgba(0,255,70,0.25);color:#00ff46;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:background 0.2s,transform 0.2s;}
        .ttt-x:hover{background:rgba(0,255,70,0.18);transform:scale(1.1);}

        .ttt-terminal{width:340px;border:1px solid rgba(0,255,70,0.15);border-radius:8px;overflow:hidden;box-shadow:0 0 60px rgba(0,255,70,0.06),0 20px 60px rgba(0,0,0,0.5);}
        .ttt-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:rgba(0,255,70,0.04);border-bottom:1px solid rgba(0,255,70,0.1);}
        .ttt-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
        .ttt-dot--r{background:#ff5f57;} .ttt-dot--y{background:#ffbd2e;} .ttt-dot--g{background:#28c840;}
        .ttt-bar__title{margin-left:8px;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(0,255,70,0.35);letter-spacing:0.06em;}

        .ttt-body{padding:24px;background:#050505;}
        .ttt-prompt{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(0,255,70,0.5);margin-bottom:24px;letter-spacing:0.04em;}

        .ttt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;width:240px;margin:0 auto 24px;}
        .ttt-cell{width:57px;height:57px;background:rgba(0,255,70,0.03);border:1px solid rgba(0,255,70,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s,border-color 0.2s;}
        .ttt-cell:hover:not(:disabled){background:rgba(0,255,70,0.06);border-color:rgba(0,255,70,0.25);}
        .ttt-cell--filled{cursor:default;}
        .ttt-cell--win{background:rgba(0,255,70,0.1) !important;border-color:rgba(0,255,70,0.4) !important;box-shadow:0 0 12px rgba(0,255,70,0.15);}
        .ttt-cell:disabled{cursor:default;}

        .ttt-mark{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.02em;}
        .ttt-mark--x{color:#00ff46;text-shadow:0 0 12px rgba(0,255,70,0.4);}
        .ttt-mark--o{color:rgba(0,255,70,0.3);}

        .ttt-thinking{font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(0,255,70,0.3);text-align:center;margin-bottom:16px;}
        .ttt-thinking__dot{animation:ttt-blink 1.2s infinite;} .ttt-thinking__dot:nth-child(2){animation-delay:0.2s;} .ttt-thinking__dot:nth-child(3){animation-delay:0.4s;}
        @keyframes ttt-blink{0%,60%,100%{opacity:1;}30%{opacity:0;}}

        .ttt-result{text-align:center;margin-bottom:20px;}
        .ttt-result__msg{font-family:'JetBrains Mono',monospace;font-size:13px;color:#00ff46;text-shadow:0 0 10px rgba(0,255,70,0.3);letter-spacing:0.02em;}

        .ttt-restart{display:block;margin:0 auto;padding:10px 28px;border-radius:100px;background:transparent;border:1px solid rgba(0,255,70,0.25);font-family:'JetBrains Mono',monospace;font-size:11px;color:#00ff46;letter-spacing:0.06em;cursor:pointer;transition:all 0.2s;}
        .ttt-restart:hover{background:rgba(0,255,70,0.08);border-color:rgba(0,255,70,0.5);box-shadow:0 0 16px rgba(0,255,70,0.1);}
      `}</style>
    </motion.div>
  );
}
