import { useEffect, useState } from 'react'
import './App.scss'

const OBSTACLE_EMOJIS = ["🏚️", "💣"]
const FOOD_EMOJIS = ["🍎"] // , "🍏", "🍓"]
const HEAD_EMOJI = "🥷"
const BODY_EMOJI = "🩸"
const BRICK_EMOJI = "🧱"
// const HEALTH_EMOJIS = ["❤️‍🩹", "🤕"]
const SPACE_EMOJIS = ["🌲"]

type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"

type Piece = {
  next?: Piece,
  prev?: Piece,
  x: number,
  y: number,
  body: Cell[],
}

type Cell = {
  x: number,
  y: number,
}

type Grid = Cell[][]

const equateCells = (cell1: Cell, cell2: Cell): boolean => (cell1.x == cell2.x) && (cell1.y == cell2.y)


const getRandint = (int: number): number => {
  return parseInt((Math.random() * int).toFixed(0)) % int
}

const getRandomChoice = (list: string[]): string => {
  return list.at(getRandint(list.length))!
}

const getEmptyGrid = (n: number, m: number): Grid => {
  const grid: Cell[][] = [];
  for (let rowIndex = 0; rowIndex < n; rowIndex++) {
    const row: Cell[] = []
    for (let columnIndex = 0; columnIndex < m; columnIndex++) {
      row.push({ x: rowIndex, y: columnIndex })
    }
    grid.push(row)
  }
  return grid;
}

const move = (piece: Piece, direction: Direction): Piece => {
  const _piece: Piece = JSON.parse(JSON.stringify(piece))
  switch (direction) {
    case "ArrowRight":
      _piece.y++
      break;
    case "ArrowLeft":
      _piece.y--
      break;
    case "ArrowDown":
      _piece.x++
      break;
    case "ArrowUp":
      _piece.x--
      break;
  }
  _piece.body.forEach((cell, index) => {
    const nextCell: Cell = index === 0 ? piece : piece.body[index - 1]
    cell.x = nextCell.x
    cell.y = nextCell.y
  })
  return _piece
}

const eat = (piece: Piece, direction: Direction): Piece => {
  let { x, y } = piece.body.length === 0 ? piece : piece.body.at(-1)!
  const _piece: Piece = JSON.parse(JSON.stringify(piece))
  switch (direction) {
    case "ArrowRight":
      y--
      break;
    case "ArrowLeft":
      y++
      break;
    case "ArrowDown":
      x--
      break;
    case "ArrowUp":
      x++
      break;
  }
  _piece.body.push({ x, y })
  return _piece
}

function App() {
  const [rows, setRows] = useState<number>(20)
  const [columns, setColumns] = useState<number>(20)
  const [grid, setGrid] = useState<Grid>([])
  const [head, setHeadPiece] = useState<Piece>({ x: 10, y: 10, body: [{ x: 10, y: 9 }, { x: 10, y: 8 }, { x: 10, y: 7 }] })
  const [obstacleCells, setObstacleCells] = useState<Cell[]>([])
  const [foodCell, setFoodCell] = useState<Cell>({ x: 5, y: 5 })
  const [playing, setPlaying] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('ArrowRight')
  const [score, setScore] = useState<number>(0)
  const rowBoarders = [0, rows - 1]
  const columnBoarders = [0, columns - 1]

  useEffect(() => {
    setGrid(getEmptyGrid(rows, columns))
  }, [rows, columns])

  useEffect(() => {
    document.onkeydown = (e: KeyboardEvent) => {
      // console.log(e);
      switch (e.code) {
        case "Space":
          setPlaying(!playing)
          break;
        case "ArrowRight":
          setDirection("ArrowRight")
          break;
        case "ArrowLeft":
          setDirection("ArrowLeft")
          break;
        case "ArrowDown":
          setDirection("ArrowDown")
          break;
        case "ArrowUp":
          setDirection("ArrowUp")
          break;
        default:
          break;
      }
    }
  }, [playing])

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (playing) {
        const _piece = move(head, direction)
        // console.log(_piece);
        setHeadPiece(_piece)
        onMove()
      }
    }, 200);
    return () => clearInterval(intervalID)
  }, [direction, head, playing])

  const onEat = () => {
    const _piece = eat(head, direction)
    setHeadPiece(_piece)
    spawnFood()
    spawnObstacles()
  }

  const spawnFood = () => {
    setFoodCell(getEmptyCell())
  }

  const spawnObstacles = () => {
    setObstacleCells([...obstacleCells, getEmptyCell()])
  }

  const getEmptyCell = (): Cell => {
    while (true) {
      const emptyCell: Cell = { x: getRandint(rows), y: getRandint(columns) }
      if (![...obstacleCells, ...head.body, head, foodCell].find((cell) => equateCells(cell, emptyCell)) && !rowBoarders.includes(emptyCell.x) && !columnBoarders.includes(emptyCell.y)) {
        return emptyCell
      }
    }
  }

  const onMove = () => {
    if (equateCells(head, foodCell)) {
      // Collision with food
      onEat()
    } else if (rowBoarders.includes(head.x) || columnBoarders.includes(head.y)) {
      // Collision with wall
      setPlaying(false)
    } else if (head.body.find((cell) => equateCells(cell, head))) {
      // Collision with body
      setPlaying(false)
    } else if (obstacleCells.find((cell) => equateCells(cell, head))) {
      // Collision with obstacle
      setPlaying(false)
    }
  }

  const onRestart = () => {
    // TODO: Later
  }

  const onDownload = () => {
    // TODO: Later
  }

  const onUpload = () => {
    // TODO: Later
  }

  const onLeaderboard = () => {
    // TODO: Later
  }

  const onSettings = () => {
    // TODO: Later
  }

  const onExit = () => {
    confirm("Are you sure you want to quit?")
  }

  const getCharacter = (cell: Cell): string => {
    if (rowBoarders.includes(cell.x) || columnBoarders.includes(cell.y)) {
      return BRICK_EMOJI
    }
    if (equateCells(head, cell)) {
      return HEAD_EMOJI
    }
    if (head.body.find((bodyCell) => equateCells(bodyCell, cell))) {
      return BODY_EMOJI
    }
    if (equateCells(foodCell, cell)) {
      return FOOD_EMOJIS[0] // getRandomChoice(FOOD_EMOJIS)
    }
    if (obstacleCells.find((obstacleCell) => equateCells(obstacleCell, cell))) {
      return OBSTACLE_EMOJIS[0] // getRandomChoice(OBSTACLE_EMOJIS)
    }
    return ""
    // return getRandomChoice(SPACE_EMOJIS)
  }

  return (
    <main className='container'>
      <section className='control-section row mb-5'>
        <div className="col-12 justify-content-evenly">
          <button className='btn btn-secondary mx-1' onClick={onExit}>Quit</button>
          <button className='btn btn-secondary mx-1' onClick={onSettings}>Settings</button>
          <button className='btn btn-secondary mx-1' onClick={onLeaderboard}>Leaderboard</button>
          <button className='btn btn-secondary mx-1' onClick={onUpload}>Upload</button>
          <button className='btn btn-secondary mx-1' onClick={onDownload}>Download</button>
          <button className='btn btn-secondary mx-1' onClick={onRestart}>Restart</button>
          <button className='btn btn-secondary mx-1' onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
        </div>
      </section>
      <section className='grid-section row'>
        <div className='col-12'>
          <table className="table--table-sm--table-borderless mx-auto">
            <caption>Score {head.body.length}</caption>
            <tbody>
              {
                grid.map((row, rowIndex) => (
                  <tr key={rowIndex}>{row.map((cell, columnIndex) => (<td title={`(${cell.x}, ${cell.y})`} key={columnIndex}>{getCharacter(cell)}</td>))}</tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default App
