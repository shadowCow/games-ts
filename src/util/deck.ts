export type Deck<T> = Array<T>

export function shuffle<T>(deck: Deck<T>): Deck<T> {
  const shuffled = [...deck]
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }

  return shuffled
}

export function drawOne<T>(deck: Deck<T>): [Deck<T>, T | undefined] {
  const result = drawN(deck, 1)

  if (result[1].length > 0) {
    return [result[0], result[1][0]]
  } else {
    return [result[0], undefined]
  }
}

export function drawN<T>(deck: Deck<T>, n: number): [Deck<T>, Array<T>] {
  const copied = [...deck]
  const drawn: Array<T> = []

  for (let i = 0; i < n; i++) {
    const card = copied.pop()
    if (card !== undefined) {
      drawn.push(card)
    } else {
      break
    }
  }

  return [copied, drawn]
}
