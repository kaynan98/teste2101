import { useEffect, useRef, useState, useCallback } from 'react';

const GRAVITY = 0.6;
const JUMP_FORCE = -12;
const GROUND_Y = 300;
const GAME_SPEED = 6;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 40;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 40;

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const playerRef = useRef({ x: 50, y: GROUND_Y - PLAYER_HEIGHT, vy: 0, width: PLAYER_WIDTH, height: PLAYER_HEIGHT });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const frameRef = useRef(0);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const gameStartedRef = useRef(false);

  const jump = useCallback(() => {
    if (gameOverRef.current) return;
    if (!gameStartedRef.current) {
      gameStartedRef.current = true;
      setGameStarted(true);
    }
    if (playerRef.current.y >= GROUND_Y - PLAYER_HEIGHT) {
      playerRef.current.vy = JUMP_FORCE;
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      if (!gameStartedRef.current) {
        // Draw idle screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#333';
        ctx.font = '20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Pressione ESPAÇO para pular', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('e iniciar o jogo', canvas.width / 2, canvas.height / 2 + 10);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      if (gameOverRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#333';
        ctx.font = '30px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '18px monospace';
        ctx.fillText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2 + 10);
        ctx.fillText('Clique para reiniciar', canvas.width / 2, canvas.height / 2 + 50);
        frameRef.current = requestAnimationFrame(loop);
        return;
      }

      // Update player physics
      const player = playerRef.current;
      player.vy += GRAVITY;
      player.y += player.vy;
      if (player.y > GROUND_Y - PLAYER_HEIGHT) {
        player.y = GROUND_Y - PLAYER_HEIGHT;
        player.vy = 0;
      }

      // Spawn obstacles
      if (Math.random() < 0.02) {
        obstaclesRef.current.push({
          x: canvas.width,
          y: GROUND_Y - OBSTACLE_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: OBSTACLE_HEIGHT,
        });
      }

      // Move obstacles
      obstaclesRef.current = obstaclesRef.current
        .map(obs => ({ ...obs, x: obs.x - GAME_SPEED }))
        .filter(obs => obs.x + obs.width > 0);

      // Collision detection
      for (const obs of obstaclesRef.current) {
        if (
          player.x < obs.x + obs.width &&
          player.x + player.width > obs.x &&
          player.y < obs.y + obs.height &&
          player.y + player.height > obs.y
        ) {
          gameOverRef.current = true;
          setGameOver(true);
          if (scoreRef.current > parseInt(localStorage.getItem('dinoHighScore') || '0')) {
            localStorage.setItem('dinoHighScore', scoreRef.current.toString());
            setHighScore(scoreRef.current);
          }
          break;
        }
      }

      // Score
      scoreRef.current += 1;
      setScore(scoreRef.current);

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#555';
      ctx.fillRect(0, GROUND_Y, canvas.width, 2);

      // Player (dinosaur)
      ctx.fillStyle = '#2d2d2d';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(player.x + 20, player.y + 8, 6, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(player.x + 22, player.y + 10, 3, 3);

      // Obstacles (cacti)
      ctx.fillStyle = '#2d6a2d';
      for (const obs of obstaclesRef.current) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        // Spikes
        ctx.fillRect(obs.x - 5, obs.y + 5, 5, 5);
        ctx.fillRect(obs.x + obs.width, obs.y + 5, 5, 5);
      }

      // Score display
      ctx.fillStyle = '#333';
      ctx.font = '16px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`Score: ${scoreRef.current}`, canvas.width - 10, 30);

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const restart = () => {
    playerRef.current = { x: 50, y: GROUND_Y - PLAYER_HEIGHT, vy: 0, width: PLAYER_WIDTH, height: PLAYER_HEIGHT };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    gameOverRef.current = false;
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    gameStartedRef.current = true;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Jogo do Dinossauro</h1>
      <p className="text-gray-600 mb-4">Pule os obstáculos com ESPAÇO ou SETA PARA CIMA</p>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border-2 border-gray-300 rounded-lg bg-gray-100 cursor-pointer"
          onClick={() => {
            if (gameOverRef.current) {
              restart();
            } else {
              jump();
            }
          }}
        />
        <div className="absolute top-2 left-2 text-sm text-gray-500">
          {gameStarted && !gameOver && <span>Score: {score}</span>}
          {gameOver && <span className="text-red-600 font-bold">Game Over - Score: {score}</span>}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        {highScore > 0 && <p>Recorde: {highScore}</p>}
      </div>
      {gameOver && (
        <button
          onClick={restart}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Reiniciar
        </button>
      )}
    </div>
  );
}
