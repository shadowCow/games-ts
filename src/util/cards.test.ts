import { new52, standard52 } from './cards'

describe('cards', () => {
  describe('new52', () => {
    test('creates a new deck of 52 playing cards', () => {
      const deck = new52()

      expect(deck).toEqual(standard52)
      expect(deck).not.toBe(standard52)
    })
  })
})
