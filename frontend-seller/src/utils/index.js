// utils.js
export function formatWithDots(str, reduce) {
  const len = str.length

  if (len <= 2 + reduce) return str

  const mid = Math.floor(len / 2)
  const start = str.slice(0, mid - Math.floor(reduce / 2))
  const end = str.slice(mid + Math.ceil(reduce / 2))

  return start + '...' + end
}

export function reduceByLength(input, maxLength) {
  const words = input.split(' ')
  let result = ''

  for (const word of words) {
    if ((result + word).length > maxLength) {
      break
    }

    result += word + ' '
  }

  return result.trim() + "..."
}

export function functionThree() {
  return 'This is function three!'
}
