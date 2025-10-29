

export const OBSTACLE_EMOJIS = ["🏚️", "💣"]
export const FOOD_EMOJIS = ["🍎", "🍏", "🍓"]
export const HEAD_EMOJI = "🥷"
export const BODY_EMOJI = "🩸"
export const BRICK_EMOJI = "🧱"
// export const HEALTH_EMOJIS = ["❤️‍🩹", "🤕"]
export const SPACE_EMOJIS = ["🌲"]

export type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"

export type Piece = {
    next?: Piece,
    prev?: Piece,
    x: number,
    y: number,
    body: Cell[],
}

export type Cell = {
    x: number,
    y: number,
}

export type Grid = Cell[][]

export type Params = {
    rowsNumber: number
    columnsNumber: number
}

export class SnakeGame {
    private rowsNumber: number
    private columnsNumber: number
    public grid!: Grid

    constructor(params: Params) {
        this.rowsNumber = params.rowsNumber
        this.columnsNumber = params.columnsNumber
        this.setGrid()
    }

    public static equateCells = (cell1: Cell, cell2: Cell): boolean => (cell1.x == cell2.x) && (cell1.y == cell2.y)


    public static getRandint = (int: number): number => {
        return parseInt((Math.random() * int).toFixed(0)) % int
    }

    public static getRandomChoice = (list: string[]): string => {
        return list.at(this.getRandint(list.length))!
    }

    public setGrid = () => {
        const grid: Cell[][] = [];
        for (let rowIndex = 0; rowIndex < this.rowsNumber; rowIndex++) {
            const row: Cell[] = []
            for (let columnIndex = 0; columnIndex < this.columnsNumber; columnIndex++) {
                row.push({ x: rowIndex, y: columnIndex })
            }
            grid.push(row)
        }
        this.grid = grid;
    }

    public move = (piece: Piece, direction: Direction): Piece => {
        const { x, y } = piece
        const body = [...piece.body]
        const _piece: Piece = { ...piece, body: [...piece.body] }
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
            if (index === 0) {
                cell.x = x
                cell.y = y
            } else {
                const nextCell = body[index - 1]
                cell.x = nextCell.x
                cell.y = nextCell.y
            }
        })
        return _piece
    }

    public eat = (piece: Piece, direction: Direction): Piece => {
        return piece
    }
}

