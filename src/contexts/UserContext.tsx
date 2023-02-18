// import axios from 'axios'
import React, { useContext, useState, createContext, useEffect } from 'react'

import * as authService from '../services/auth'

import { useGeneral } from './GeneralContext'

import { checkExpired, firstToUpper } from '../lib/helpers'
import api from '../services/api'
import ModalSubscription from '../components/Modals/SubscriptionExpired'
import { StackActions, useNavigation } from '@react-navigation/native'

export interface User {
  name: string
  email: string
  birthDate: Date | string
  site: string | null
  phone: string
  address: string
  doc: string
  docType: number
  docImg: string
  bankAccount: string | null
  bankDigits: string | null
  bankName: string | null
  stripeAccount: string | null

  passResetCode: string | null
  passResetExpiration: string | null
  role: 1 | 2 | 3
  expoId: string | null
  subscription_expires_at: string | null
}

interface ContextProps {
  user: User | null | undefined
  userLoaded: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
  login: (email: string, pass: string) => Promise<void | string>
  logout: () => Promise<void>
  resetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void | string>
}

export const UserContext = createContext<ContextProps>({} as ContextProps)

export const UserProvider: React.FC = ({ children }: any) => {
  const { setIsLoading } = useGeneral()

  const [user, setUser] = useState<User | null | undefined>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)
  const subscriptionExpired =
    user?.role === 2 &&
    user?.subscription_expires_at &&
    checkExpired(user?.subscription_expires_at)
  const navigate = useNavigation()

  const getUser = async () => {
    setIsLoading(true)
    try {
      const { data } = await authService.getUserApi()
      setUser(data.user)
    } catch (e: any) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const login = async (email: string, pass: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login(email, pass)
      setIsLoading(false)

      if (response.status === 200) {
        localStorage.setItem('@Moovin:token', response.data.accessToken)
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        await getUser()
        navigate.dispatch(StackActions.replace('home'))
      } else {
        return console.log({ message: firstToUpper(response.data.errors[0]) })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    localStorage.removeItem('@Moovin:token')
    delete api.defaults.headers.common.Authorization
    setUser(undefined)
    setUserLoaded(true)
  }

  const resetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    setIsLoading(true)
    try {
      const response = await authService.resetPassword(email, code, password)
      if (response.status === 200) {
        localStorage.setItem('@Moovin:token', response.data.accessToken)
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        await getUser()
        navigate.dispatch(StackActions.replace('/'))
      } else {
        return firstToUpper(response.data.errors[0])
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      setIsLoading(true)
      const token = localStorage.getItem('@Moovin:token')
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        await getUser()
      }
      setUserLoaded(true)
      setIsLoading(false)
    }
    loadUserFromCookies()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        userLoaded,
        setUser,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
      {subscriptionExpired && <ModalSubscription />}
    </UserContext.Provider>
  )
}

export const useUser = (): ContextProps => useContext(UserContext)
