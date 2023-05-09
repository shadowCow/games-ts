import {
  madeMove,
  moveEndedGame,
  invalidMove,
  unfinished,
  tie,
  winner,
} from '../../util/game_rules'
import {
  TicTacToeState,
  createTicTacToeRules,
  outOfTurnMessage,
  tileAlreadyOccupiedMessage,
} from './tic_tac_toe'

describe('tic tac toe rules', () => {
  const rules = createTicTacToeRules()

  describe('isValidMove', () => {
    test('a valid move', () => {
      const isValid = rules.isValidMove(rules.initState(), {
        tile: 0,
        owner: 1,
      })

      expect(isValid).toEqual(true)
    })

    test('an invalid move', () => {
      const isValid = rules.isValidMove(anEarlyGame(), { tile: 0, owner: 1 })

      expect(isValid).toEqual(false)
    })
  })

  describe('initState', () => {
    test('returns an empty board with player 1 to play', () => {
      const state = rules.initState()

      expect(state).toEqual(aNewGame())
    })
  })

  describe('onMove', () => {
    test('a valid move that does not end the game', () => {
      const state = anEarlyGame()

      const result = rules.onMove(state, { tile: 8, owner: 2 })

      expect(result).toEqual(
        madeMove({
          state: {
            board: [
              1,
              2,
              1,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              2,
            ],
            playerTurn: 1,
          },
        }),
      )
    })

    test('a valid move that ends the game', () => {
      const state = aLateGame()
      const result = rules.onMove(state, { tile: 6, owner: 1 })

      expect(result).toEqual(
        moveEndedGame({
          state: aLateGameWon(),
        }),
      )
    })

    test('an invalid move', () => {
      const state = anEarlyGame()
      const result = rules.onMove(state, { tile: 0, owner: 2 })

      expect(result).toEqual(
        invalidMove({ reason: tileAlreadyOccupiedMessage(0) }),
      )
    })

    test('a move out of turn', () => {
      const state = anEarlyGame()
      const result = rules.onMove(state, { tile: 8, owner: 1 })

      expect(result).toEqual(invalidMove({ reason: outOfTurnMessage(2, 1) }))
    })
  })

  describe('getOutcome', () => {
    test('an unfinished game', () => {
      const result = rules.getOutcome(aLateGame())
      expect(result).toEqual(unfinished())
    })

    test('a game that ended with a tie', () => {
      const result = rules.getOutcome(aTiedGame())
      expect(result).toEqual(tie())
    })

    test('a game that ended with a winner', () => {
      const result = rules.getOutcome(aLateGameWon())
      expect(result).toEqual(winner({ player: 1 }))
    })
  })
})

function anEmptyBoard(): TicTacToeState['board'] {
  const board = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]

  return board
}

function aNewGame(): TicTacToeState {
  return {
    board: anEmptyBoard(),
    playerTurn: 1,
  }
}

function anEarlyGame(): TicTacToeState {
  return {
    board: [
      1,
      2,
      1,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
    playerTurn: 2,
  }
}

function aLateGame(): TicTacToeState {
  return {
    board: [1, 2, 1, 1, 2, 2, undefined, undefined, undefined],
    playerTurn: 1,
  }
}

function aLateGameWon(): TicTacToeState {
  return {
    board: [1, 2, 1, 1, 2, 2, 1, undefined, undefined],
    playerTurn: 2,
  }
}

function aTiedGame(): TicTacToeState {
  return {
    board: [1, 1, 2, 2, 2, 1, 1, 2, 1],
    playerTurn: 2,
  }
}
