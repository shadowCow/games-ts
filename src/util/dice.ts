export type D6Value = 1 | 2 | 3 | 4 | 5 | 6

export function rollD6(): D6Value {
  return rollDie(6) as D6Value
}

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}
