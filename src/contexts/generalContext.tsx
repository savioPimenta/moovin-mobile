import React, { useContext, useState, createContext } from 'react'
import Loading from '../components/Loading'
import Pusher from 'pusher-js/react-native'
import RefuseOrder from '../components/Modals/RefuseOrder'

export interface RefuseAndCancel {
  code: string
  callback?: () => Promise<void>
}
interface ContextProps {
  isLoading: boolean
  setIsLoading: any
  showSuccessSignup: boolean
  setShowSuccessSignup: React.Dispatch<React.SetStateAction<boolean>>
  showRefuse: RefuseAndCancel | undefined
  setShowRefuse: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  showCancel: RefuseAndCancel | undefined
  setShowCancel: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
  showFinish: RefuseAndCancel | undefined
  setShowFinish: React.Dispatch<
    React.SetStateAction<RefuseAndCancel | undefined>
  >
}

export const channels = new Pusher('2d9eb68fbdf6e96af68d', {
  cluster: 'eu',
})
export const GeneralContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
  children: React.ReactNode
}

export const GeneralProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessSignup, setShowSuccessSignup] = useState(false)

  const [showRefuse, setShowRefuse] = useState<RefuseAndCancel | undefined>()
  const [showCancel, setShowCancel] = useState<RefuseAndCancel | undefined>()
  const [showFinish, setShowFinish] = useState<RefuseAndCancel | undefined>()

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showSuccessSignup,
        setShowSuccessSignup,
        showRefuse,
        setShowRefuse,
        showCancel,
        setShowCancel,
        showFinish,
        setShowFinish,
      }}
    >
      {children}
      {isLoading && <Loading />}
      {showRefuse && (
        <RefuseOrder
          setShowRefuse={setShowRefuse}
          showRefuse={showRefuse}
          setIsLoading={setIsLoading}
        />
      )}
    </GeneralContext.Provider>
  )
}

export const useGeneral = (): ContextProps => useContext(GeneralContext)
