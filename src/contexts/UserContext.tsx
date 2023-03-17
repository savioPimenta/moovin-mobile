// import axios from 'axios'
import React, { useContext, useState, createContext, useEffect } from 'react'

import * as authService from '../services/auth'

import { useGeneral } from './generalContext'

import { checkExpired, firstToUpper } from '../lib/helpers'
import api from '../services/api'
import ModalSubscription from '../components/Modals/SubscriptionExpired'
import { StackActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Withdraw from '../components/Modals/Withdraw'

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
  getUser: () => Promise<any>
  userLoaded: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>
  showWithdraw: boolean
  setShowWithdraw: React.Dispatch<React.SetStateAction<boolean>>
  balance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>
  login: (email: string, pass: string) => Promise<void | string>
  logout: () => Promise<void>
  resetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void | string>
}

export const UserContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode
}

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const { showError, setIsLoading, showSuccess } = useGeneral()

  const [user, setUser] = useState<User | null | undefined>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)

  const [showWithdraw, setShowWithdraw] = useState<boolean>(false)
  const [balance, setBalance] = useState(0)

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
      navigate.dispatch(StackActions.replace('home'))
    } catch (e: any) {
      navigate.dispatch(StackActions.replace('signin'))
      showError(e)
    }
    setIsLoading(false)
  }

  const login = async (email: string, pass: string) => {
    try {
      setIsLoading(true)
      const response = await authService.login(email, pass)
      setIsLoading(false)

      if (response.status === 200) {
        await AsyncStorage.setItem('@Moovin:token', response.data.accessToken)
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        await getUser()
        navigate.dispatch(StackActions.replace('home'))
      } else {
        return showError(firstToUpper(response.data.errors[0]) as any)
      }
    } catch (error) {
      showError(error as any)
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('@Moovin:token')
    delete api.defaults.headers.common.Authorization
    setUser(undefined)
    setUserLoaded(true)
    navigate.dispatch(StackActions.replace('signin'))
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
        await AsyncStorage.setItem('@Moovin:token', response.data.accessToken)
        api.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        await getUser()
        navigate.dispatch(StackActions.replace('home'))
      } else {
        return firstToUpper(response.data.errors[0])
      }
    } catch (error) {
      showError(error as any)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('@Moovin:token')
      if (token) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        await getUser()
      } else {
        navigate.dispatch(StackActions.replace('signin'))
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
        getUser,
        userLoaded,
        setUser,
        showWithdraw,
        setShowWithdraw,
        balance,
        setBalance,
        login,
        logout,
        resetPassword,
      }}
    >
      {children}
      {subscriptionExpired && <ModalSubscription />}

      {showWithdraw && (
        <Withdraw
          setShowWithdraw={setShowWithdraw}
          showWithdraw={showWithdraw}
          setIsLoading={setIsLoading}
          showError={showError}
          showSuccess={showSuccess}
          user={user}
          balance={balance}
          setBalance={setBalance}
        />
      )}
    </UserContext.Provider>
  )
}

export const useUser = (): ContextProps => useContext(UserContext)
