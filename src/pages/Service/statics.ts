import { StackActions } from '@react-navigation/native'
import { acceptOrder } from '../../services/order'

export const serviceStatusType = [
  {
    id: 2,
    label: 'Opened',
  },
  {
    id: 3,
    label: 'In progress',
  },
  {
    id: 4,
    label: 'Finished',
  },
  {
    id: 5,
    label: 'Finished',
  },
]

export const handleChangeStatus = async (
  type: any,
  code: any,
  navigate: any,
  setIsLoading: any,
  showError: any,
  showSuccess: any,
  callback?: any,
  hasToPop?: boolean
) => {
  if (code) {
    setIsLoading(true)
    try {
      await acceptOrder(code, type)
      let message
      switch (type) {
        case 1:
          message =
            'Service accepted successfully. You will shortly receive the necessary information by email!'
          break
        case 2:
          message = 'Service refused successfully!'
          break
        default:
          message =
            'Service canceled successfully. We will contact the customer to help them find another service provider!'
          break
      }
      if (callback) {
        await callback()
      }
      if (hasToPop) {
        navigate.dispatch(StackActions.pop())
      }
      showSuccess(message)
    } catch (error: any) {
      showError(error)
    }
    setIsLoading(false)
  }
}
