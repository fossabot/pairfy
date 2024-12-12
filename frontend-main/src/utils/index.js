export function formatWithDots(str, reduce) {
  const len = str.length

  if (len <= 2 + reduce) return str

  const mid = Math.floor(len / 2)
  const start = str.slice(0, mid - Math.floor(reduce / 2))
  const end = str.slice(mid + Math.ceil(reduce / 2))

  return start + '...' + end
}

export function reduceByLength(input, length) {
  if (input.length > length) {
    return input.slice(0, length) + "..."; 
  }
  
  return input;
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

  return Math.round(discountedPrice)
}

/**
 * Converts USD to ADA.
 * @param {number} usdAmount - The amount in USD to convert.
 * @param {number} adaPrice - The price of 1 ADA in USD.
 * @returns {number} The converted ADA amount as a number.
 */
export function convertUSDToADA(usdAmount, adaPrice) {
  if (usdAmount < 0) {
    throw new Error('USD amount cannot be negative.')
  }

  if (adaPrice <= 0) {
    throw new Error('ADA price must be greater than 0.')
  }

  const amountInADA = usdAmount / adaPrice

  return Math.round(amountInADA)
}

export function convertLovelaceToADA(lovelace) {
  if (lovelace <= 0) {
    throw new Error('ADA price must be greater than 0.')
  }

  const amountInADA = lovelace / 1_000_000

  return amountInADA.toFixed(2)
}

/**
 * Converts lovelace to USD.
 * @param {number} lovelace - The amount in lovelace to convert.
 * @param {number} adaPrice - The price of 1 ADA in USD.
 * @returns {number} The converted USD amount.
 */
export function convertLovelaceToUSD(lovelace, adaPrice) {
  if (lovelace <= 0) {
    throw new Error('lovelace amount must be greater than 0.')
  }

  if (adaPrice <= 0) {
    throw new Error('ADA price must be greater than 0.')
  }

  const amountInADA = lovelace / 1_000_000

  const amountInUSD = amountInADA * adaPrice

  return Math.round(amountInUSD)
}


export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}