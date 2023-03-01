export const checkExpired = (date: string): boolean => {
  const newDate = new Date(date)
  if (newDate <= new Date()) {
    return true
  }
  return false
}

export const firstToUpper = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const currencyFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
})

export const moneyMask = (value: string): any => {
  value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

  const options = { minimumFractionDigits: 2 }
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(value) / 100
  )
  if (result === undefined || result === 'NaN') {
    return '0,00'
  }
  return result
}