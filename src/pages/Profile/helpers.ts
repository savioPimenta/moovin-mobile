/* eslint-disable @typescript-eslint/ban-ts-comment */

import moment from "moment"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const objDiff = (a: any, b: any): any => {
  const changes = Object.entries(b)
    .reduce((acc, cv) => {
      // @ts-ignore
      if (JSON.stringify(b[cv[0]]) !== JSON.stringify(a[cv[0]])) acc.push(cv)
      return acc
    }, [])
    .reduce((acc, cv) => {
      acc[cv[0]] = cv[1]
      return acc
    }, {})
  return changes
}

const checkDate = (date: string): boolean => {
  if (date.length < 10) return false
  const actualDate = moment()
  if (!moment(date, 'DD/MM/YYYY').isValid()) return false
  if (moment(date, 'DD/MM/YYYY').isAfter(actualDate)) return false
  return true
}

const convertoToFormdata = (obj: any): FormData => {
  const form_data = new FormData()

  for (const key in obj) {
    form_data.append(key, obj[key])
  }
  return form_data
}

const dateFormatter = (value: string): string => {
  const cleaned = ('' + value).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/)
  if (match) {
    return match[1] + '/' + match[2] + '/' + match[3]
  }

  const match2 = cleaned.match(/^(\d{2})(\d{1})(\d{2})(\d{1})(\d{4})$/)
  if (match2) {
    return match2[1] + '/' + match2[2] + '/' + match2[3]
  }
  return cleaned
}

export { objDiff, checkDate, convertoToFormdata, dateFormatter }
