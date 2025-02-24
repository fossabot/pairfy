import dayjs from 'dayjs'

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

export function formatCurrency(value, type_) {
  let type = type_ || 'USD'

  if (value) {
    let result = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    return result + ' ' + type
  }
}

export function formatUSD(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatSKU(value) {
  if (value) {
    return value.split(':')[0]
  }
}

export function convertDate(timestamp, format) {
  const date = dayjs(parseInt(timestamp))

  return date.format(format ? format : 'YYYY-MM-DD')
}

export function applyDiscount(price, discount, isPercentage = true) {
  if (typeof price !== 'number' || price < 0) {
    throw new Error('Invalid price: must be a non-negative number.')
  }
  if (typeof discount !== 'number' || discount < 0) {
    throw new Error('Invalid discount: must be a non-negative number.')
  }

  let finalPrice

  if (isPercentage) {
    if (discount > 100) discount = 100
    finalPrice = price * (1 - discount / 100)
  } else {
    if (discount > price) discount = price
    finalPrice = price - discount
  }

  const result = Number(finalPrice.toFixed(2));

  return formatUSD(result)
}


export function getDiscount(price, discount, isPercentage = true) {
  if (typeof price !== "number" || price < 0) {
      throw new Error("Invalid price: must be a non-negative number.");
  }
  if (typeof discount !== "number" || discount < 0) {
      throw new Error("Invalid discount: must be a non-negative number.");
  }

  let discountAmount;
  
  if (isPercentage) {
      if (discount > 100) discount = 100; 
      discountAmount = price * (discount / 100);
  } else {
      if (discount > price) discount = price; 
      discountAmount = discount;
  }

  const result = Number(discountAmount.toFixed(2)); 

  return formatUSD(result)
}
