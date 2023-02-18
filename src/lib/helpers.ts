export const checkExpired = (date: string): boolean => {
  const newDate = new Date(date)
  if (newDate <= new Date()) {
    return true
  }
  return false
}

export const firstToUpper = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)
