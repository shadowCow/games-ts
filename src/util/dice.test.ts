import { rollD6, rollDie } from './dice'

describe('dice', () => {
  describe('rollD6', () => {
    test('rolls a number from 1 to 6', () => {
      for (let i = 0; i < 1000; i++) {
        const rolled = rollD6()

        expect(rolled).toBeLessThanOrEqual(6)
        expect(rolled).toBeGreaterThanOrEqual(1)
      }
    })
  })

  describe('rollDie', () => {
    test('rolls a number from 1 to N', () => {
      const n = 20
      for (let i = 0; i < 1000; i++) {
        const rolled = rollDie(20)

        expect(rolled).toBeLessThanOrEqual(20)
        expect(rolled).toBeGreaterThanOrEqual(1)
      }
    })
  })
})
