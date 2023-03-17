import React from 'react'
import { checkDate } from './helpers'

export interface CreateUserProps {
  name?: string
  email?: string
  birthDate?: string
  phone?: string
  pass?: string
  site?: string
  doc?: string
  docType?: 1 | 2
  docImg?: File
  address?: string
  bankAccount?: string
  role?: 1 | 2
  redirect_url?: string
}

export type ExtendedCreateUser = Omit<CreateUserProps, 'docType' | 'docImg'> & {
  docType?: string
  docImg?: string
}

export const handleVerify = (
  data: CreateUserProps & { bankDigits?: string },
  error: ExtendedCreateUser & { bankDigits?: string },
  setError: React.Dispatch<
    React.SetStateAction<ExtendedCreateUser & { bankDigits?: string }>
  >,
  isEdit?: boolean
): boolean => {
  const newErr = { ...error }

  if (!data.name) {
    setError({ ...newErr, name: 'Nome obrigatório' })
    return false
  }
  newErr.name = undefined

  if (!data.email) {
    setError({ ...newErr, email: 'Email obrigatório' })
    return false
  }
  newErr.email = undefined

  if (!data.birthDate || !checkDate(data.birthDate)) {
    setError({ ...newErr, birthDate: 'Insira uma data válida' })
    return false
  }
  newErr.birthDate = undefined

  if (!data.phone || data.phone.length < 9) {
    setError({ ...newErr, phone: 'Insira um telefone válido' })
    return false
  }
  newErr.phone = undefined

  if (!isEdit) {
    if (!data.pass || data.pass.length < 6) {
      setError({
        ...newErr,
        pass: 'A senha deve conter no mínimo 6 caracteres'
      })
      return false
    }
    newErr.pass = undefined
  }

  if (!data.address || data.address.length < 10) {
    setError({
      ...newErr,
      address: 'Insira um endereço válido'
    })
    return false
  }
  newErr.address = undefined

  if (!data.doc) {
    setError({
      ...newErr,
      doc: 'Insira uma licença válida'
    })
    return false
  }
  newErr.doc = undefined

  if (!isEdit) {
    if (!data.docImg) {
      setError({
        ...newErr,
        docImg: 'Insira o pdf do seu documento'
      })
      return false
    }
    newErr.docImg = undefined
  }

  if (!isEdit) {
    if (!data.bankAccount) {
      setError({
        ...newErr,
        bankAccount: 'Insira um conta bancária válida'
      })
      return false
    }
    newErr.bankAccount = undefined
  } else {
    if (!data.bankDigits) {
      setError({
        ...newErr,
        bankDigits: 'Insira um conta bancária válida'
      })
      return false
    }
    newErr.bankDigits = undefined
  }

  setError(newErr)

  return true
}

export const convertDate = (date: string): string => {
  const arr = date.split('/')
  return arr[1] + '/' + arr[0] + '/' + arr[2]
}
