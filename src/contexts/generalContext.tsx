import React, { useContext, useState, createContext } from 'react'
import Loading from '../components/Loading'

interface ContextProps {
  isLoading: boolean
  setIsLoading: any
  showSuccessSignup: boolean
  setShowSuccessSignup: React.Dispatch<React.SetStateAction<boolean>>
}

export const GeneralContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode
}

export const GeneralProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessSignup, setShowSuccessSignup] = useState(false)
  

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showSuccessSignup,
        setShowSuccessSignup
      }}
    >
      {children}
      {isLoading && <Loading />}
    </GeneralContext.Provider>
  )
}

export const useGeneral = (): ContextProps => useContext(GeneralContext)
