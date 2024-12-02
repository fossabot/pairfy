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

  return result.trim() + '...'
}

export function formatCurrency(value) {
  if (value) {
    let result = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return result
  }
}

export function applyDiscount(active, originalPrice, discountPercent) {
  if (!active) {
    return originalPrice
  }

  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percentage must be between 0 and 100')
  }

  const discountAmount = (originalPrice * discountPercent) / 100

  const discountedPrice = originalPrice - discountAmount

  return parseInt(discountedPrice)
}
