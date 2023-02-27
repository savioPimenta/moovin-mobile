import React, { useContext, useState, createContext } from 'react'
import Loading from '../components/Loading'
import Pusher from 'pusher-js/react-native'
import RefuseOrder from '../components/Modals/RefuseOrder'
import CancelOrder from '../components/Modals/CancelOrder'
import FinishOrder from '../components/Modals/FinishOrder'

export interface RefuseAndCancel {
  code: string
  callback?: () => Promise<void>
}

interface ToastProps {
  type: string | null
  message: any
  show: boolean
  duration: number
  iconName: string
}

interface ContextProps {
  isLoading: boolean
  setIsLoading: any
  showSuccessSignup: boolean
  setShowSuccessSignup: React.Dispatch<React.SetStateAction<boolean>>
  showSuccessPass: boolean
  setShowSuccessPass: React.Dispatch<React.SetStateAction<boolean>>
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
  toast: ToastProps
  clearToast: Function
  showSuccess(message: string): void
  showError(e: any): void
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
  const [showSuccessPass, setShowSuccessPass] = useState(false)

  const [showRefuse, setShowRefuse] = useState<RefuseAndCancel | undefined>()
  const [showCancel, setShowCancel] = useState<RefuseAndCancel | undefined>()
  const [showFinish, setShowFinish] = useState<RefuseAndCancel | undefined>()

  const [toast, setToast] = useState<ToastProps>({
    type: null,
    message: null,
    show: false,
    duration: 4000,
    iconName: '',
  })

  const clearToast = () => {
    setToast({
      type: null,
      message: null,
      show: false,
      duration: 4000,
      iconName: '',
    })
  }

  const showSuccess = (message: string) => {
    setToast({
      type: 'success',
      message: message,
      show: true,
      duration: 4000,
      iconName: 'check',
    })
  }

  const showError = (e: any) => {
    const message =
      e?.response?.data?.message ||
      e?.response?.data?.errors?.[0] ||
      e?.message ||
      'We had internal problems'
    setToast({
      type: 'error',
      message: message,
      show: true,
      duration: 4000,
      iconName: 'exclamation-triangle',
    })
  }

  return (
    <GeneralContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showSuccessSignup,
        setShowSuccessSignup,
        showSuccessPass,
        setShowSuccessPass,
        showRefuse,
        setShowRefuse,
        showCancel,
        setShowCancel,
        showFinish,
        setShowFinish,
        toast,
        clearToast,
        showSuccess,
        showError,
      }}
    >
      {children}
      {showRefuse && (
        <RefuseOrder
          setShowRefuse={setShowRefuse}
          showRefuse={showRefuse}
          setIsLoading={setIsLoading}
          showError={showError}
          showSuccess={showSuccess}
        />
      )}
      {showCancel && (
        <CancelOrder
          setShowCancel={setShowCancel}
          showCancel={showCancel}
          setIsLoading={setIsLoading}
          showError={showError}
          showSuccess={showSuccess}
        />
      )}
      {showFinish && (
        <FinishOrder
          setShowFinish={setShowFinish}
          showFinish={showFinish}
          setIsLoading={setIsLoading}
          showError={showError}
          showSuccess={showSuccess}
        />
      )}
      {isLoading && <Loading />}
    </GeneralContext.Provider>
  )
}

export const useGeneral = (): ContextProps => useContext(GeneralContext)
