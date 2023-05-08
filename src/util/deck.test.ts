import {
  Card,
  aceOfSpades,
  eightOfSpades,
  fiveOfClubs,
  fourOfClubs,
  kingOfSpades,
  new52,
  queenOfSpades,
  sevenOfHearts,
  sixOfDiamonds,
  threeOfClubs,
  twoOfClubs,
} from './cards'
import { drawN, drawOne, shuffle } from './deck'

describe('deck', () => {
  describe('shuffle', () => {
    test('returns a new deck in a different ordering', () => {
      const deck = new52()

      const shuffled = shuffle(deck)

      expect(shuffled).not.toBe(deck)
      expect(shuffled).not.toEqual(deck)
    })
  })

  describe('drawOne', () => {
    test('gets next card from a non-empty deck', () => {
      const deck = new52()

      const [nextDeck, drawn] = drawOne(deck)

      expect(drawn).toEqual(aceOfSpades)
      expect(nextDeck).toEqual(
        deck.filter((card) => !(card.rank === 14 && card.suit === 'spades')),
      )
    })

    test('gets nothing from an empty deck', () => {
      const deck: Array<Card> = []

      const [nextDeck, drawn] = drawOne(deck)

      expect(drawn).toBeUndefined()
      expect(nextDeck).toEqual([])
    })
  })

  describe('drawN', () => {
    test('gets next n cards when deck has more than n cards', () => {
      const deck = new52()

      const [nextDeck, drawn] = drawN(deck, 3)

      expect(drawn).toEqual([aceOfSpades, kingOfSpades, queenOfSpades])
      expect(nextDeck).toEqual(
        deck.filter((card) => !(card.rank > 11 && card.suit === 'spades')),
      )
    })

    test('gets next n cards when deck has exactly n cards', () => {
      const deck = [fiveOfClubs, sixOfDiamonds, sevenOfHearts, eightOfSpades]

      const [nextDeck, drawn] = drawN(deck, 4)

      const expectedDrawn = [...deck]
      expectedDrawn.reverse()
      expect(drawn).toEqual(expectedDrawn)
      expect(nextDeck).toEqual([])
    })

    test('gets all remaining cards when deck has less than n cards', () => {
      const deck = [fiveOfClubs, sixOfDiamonds, sevenOfHearts, eightOfSpades]

      const [nextDeck, drawn] = drawN(deck, 5)

      const expectedDrawn = [...deck]
      expectedDrawn.reverse()
      expect(drawn).toEqual(expectedDrawn)
      expect(nextDeck).toEqual([])
    })
  })
})
