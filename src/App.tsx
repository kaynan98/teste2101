import { useState, useEffect, useRef, useCallback } from 'react'

const GRAVITY = 0.6
const JUMP_FORCE = -12
const GROUND_Y = 300
const GAME_SPEED = 6
const OBSTACLE_INTERVAL = 1500

interface Obstacle {
  x: number
  width: number
  height: number
}

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [dinoY, setDinoY] = useState(GROUND_Y)
  const [velocity, setVelocity] = useState(0)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [isJumping, setIsJumping] = useState(false)

  const gameLoopRef = useRef<number>(0)
  const obstacleTimerRef = useRef<number>(0)
  const scoreRef = useRef(0)
  const dinoYRef = useRef(GROUND_Y)
  const velocityRef = useRef(0)
  const obstaclesRef = useRef<Obstacle[]>([])
  const gameOverRef = useRef(false)

  const resetGame = useCallback(() => {
    setGameOver(false)
    setScore(0)
    setDinoY(GROUND_Y)
    setVelocity(0)
    setObstacles([])
    setIsJumping(false)
    scoreRef.current = 0
    dinoYRef.current = GROUND_Y
    velocityRef.current = 0
    obstaclesRef.current = []
    gameOverRef.current = false
  }, [])

  const jump = useCallback(() => {
    if (gameOverRef.current) return
    if (dinoYRef.current >= GROUND_Y - 2) {
      velocityRef.current = JUMP_FORCE
      setIsJumping(true)
    }
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setGameStarted(true)
  }, [resetGame])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameStarted, gameOver, jump])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = () => {
      // Update dino physics
      let newY = dinoYRef.current + velocityRef.current
      let newVelocity = velocityRef.current + GRAVITY

      if (newY >= GROUND_Y) {
        newY = GROUND_Y
        newVelocity = 0
        setIsJumping(false)
      }

      dinoYRef.current = newY
      velocityRef.current = newVelocity
      setDinoY(newY)
      setVelocity(newVelocity)

      // Move obstacles
      const updatedObstacles = obstaclesRef.current
        .map(obs => ({ ...obs, x: obs.x - GAME_SPEED }))
        .filter(obs => obs.x + obs.width > 0)

      obstaclesRef.current = updatedObstacles
      setObstacles(updatedObstacles)

      // Collision detection
      const dinoRect = {
        x: 50,
        y: newY,
        width: 40,
        height: 40
      }

      for (const obs of updatedObstacles) {
        if (
          dinoRect.x < obs.x + obs.width &&
          dinoRect.x + dinoRect.width > obs.x &&
          dinoRect.y < obs.y + obs.height &&
          dinoRect.y + dinoRect.height > obs.y
        ) {
          gameOverRef.current = true
          setGameOver(true)
          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current)
          }
          return
        }
      }

      // Score
      scoreRef.current += 1
      setScore(scoreRef.current)

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => cancelAnimationFrame(gameLoopRef.current)
  }, [gameStarted, gameOver, highScore])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    const spawnObstacle = () => {
      const height = 30 + Math.random() * 20
      const newObstacle: Obstacle = {
        x: 800,
        width: 20,
        height: height
      }
      obstaclesRef.current = [...obstaclesRef.current, newObstacle]
      setObstacles([...obstaclesRef.current])
    }

    obstacleTimerRef.current = window.setInterval(spawnObstacle, OBSTACLE_INTERVAL)

    return () => clearInterval(obstacleTimerRef.current)
  }, [gameStarted, gameOver])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🦖 Dino Game
        </h1>

        <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ height: 400 }}>
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400" style={{ top: GROUND_Y + 40 }} />

          {/* Dino */}
          <div
            className="absolute bg-green-600 rounded-md transition-transform"
            style={{
              left: 50,
              top: dinoY,
              width: 40,
              height: 40,
              transform: isJumping ? 'rotate(-10deg)' : 'rotate(0deg)'
            }}
          >
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
          </div>

          {/* Obstacles */}
          {obstacles.map((obs, i) => (
            <div
              key={i}
              className="absolute bg-red-500 rounded-sm"
              style={{
                left: obs.x,
                bottom: 0,
                width: obs.width,
                height: obs.height
              }}
            />
          ))}

          {/* Score */}
          <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-bold">
            {score}
          </div>

          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold mb-2">Game Over</p>
              <p className="text-white mb-4">Score: {score}</p>
              <button
                onClick={startGame}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                Jogar Novamente
              </button>
            </div>
          )}

          {/* Start screen */}
          {!gameStarted && (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <p className="text-white text-xl font-bold mb-4">Pressione Espaço para pular</p>
              <button
                onClick={startGame}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition shadow"
              >
                Iniciar Jogo
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-gray-600 text-sm">
          <p>High Score: {highScore}</p>
          <p className="mt-1">Use Espaço ou Seta para cima para pular</p>
        </div>
      </div>
    </div>
  )
}
