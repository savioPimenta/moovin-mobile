import { format } from 'date-fns'
import { DocumentResult } from 'expo-document-picker'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import Input from '../../components/Input'
import Upload from '../../components/Upload'
import { useGeneral } from '../../contexts/generalContext'
import { User, useUser } from '../../contexts/userContext'
import { colors } from '../../lib/colors'
import { editUserData } from '../../services/auth'
import { convertoToFormdata, dateFormatter, objDiff } from './helpers'

import * as S from './styles'
import {
  convertDate,
  CreateUserProps,
  ExtendedCreateUser,
  handleVerify,
} from './utils'
import { StackActions, useNavigation } from '@react-navigation/native'

type EditUserProps = Omit<
  CreateUserProps & {
    bankDigits?: string
    docImg?: string | DocumentResult
    stripeCustomer?: string
    subscription_expires_at?: string
    subscription_stripe?: string
  },
  'bankAccount'
>

export type CreateUserOmitter = Omit<EditUserProps, 'docType' | 'docImg'> & {
  docType?: string
  docImg?: string
}

type ExtendedEditUser = Omit<CreateUserOmitter, 'bankAccount'> & {
  bankDigits?: string
}

const handleData = (
  data: EditUserProps,
  setData: React.Dispatch<React.SetStateAction<EditUserProps>>,
  prop: keyof EditUserProps,
  value: any,
  verify: (d?: EditUserProps) => boolean,
  error: ExtendedEditUser
) => {
  const obj = { ...data }
  obj[prop] = value
  setData(obj)
  if (error[prop] !== '') {
    verify(obj)
  }
}

const defaultData = {
  name: '',
  address: '',
  bankDigits: '',
  birthDate: '',
  doc: '',
  docImg: undefined,
  docType: 1 as 1 | 2,
  email: '',
  pass: '',
  phone: '',
  site: '',
}

const verifyDisabled = (error: ExtendedEditUser, data: EditUserProps) => {
  const obj = { ...data }
  const hasErrors = Object.values(error).some((x) => !!x)
  delete obj.site
  delete obj.stripeCustomer
  delete obj.stripeCustomer
  delete obj.subscription_expires_at
  delete obj.subscription_stripe
  const incompleteData = Object.values(obj).some((x) => !x)
  return !!(hasErrors || incompleteData)
}

const Profile: React.FC = () => {
  const navigate = useNavigation()
  const { user, getUser } = useUser()
  const { showError, setIsLoading, showSuccess } = useGeneral()
  const [data, setData] = useState<EditUserProps>(defaultData)
  const [initialData, setInitialData] = useState<EditUserProps | undefined>()
  const [error, setError] = useState<ExtendedEditUser>({
    ...defaultData,
    docImg: '',
    docType: '',
  })

  const verify = (d?: EditUserProps) => {
    const newData = d || data
    return handleVerify(newData, error, setError, true)
  }

  const handleSendData = async () => {
    if (verify()) {
      setIsLoading(true)
      try {
        const newData = objDiff(initialData, data)
        if (newData.birthDate) {
          newData.birthDate = convertDate(newData.birthDate || '')
        }
        if (newData.docImg) {
          let nameParts = newData.docImg.name.split('.')
          let fileType = nameParts[nameParts.length - 1]

          newData.docImg = {
            uri: newData.docImg.uri,
            type: 'image/' + fileType,
            size: newData.docImg.size,
            name: newData.docImg.name.toLowerCase(),
          }
        }
        const obj = convertoToFormdata(newData)
        await editUserData(obj)
        await getUser()
        navigate.dispatch(StackActions.popToTop())
        showSuccess('Your personal information has been successfully changed')
      } catch (error) {
        showError(error)
      }
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      const obj = user as Partial<User>
      if (obj.birthDate) {
        obj.birthDate = format(new Date(obj.birthDate), 'dd/MM/yyyy')
      }
      delete obj.role
      delete obj.passResetExpiration
      delete obj.passResetCode
      delete obj.stripeAccount
      delete obj.bankName
      delete obj.bankAccount
      delete obj.expoId

      setData(obj as EditUserProps)
      !initialData && setInitialData(obj as EditUserProps)
    }
  }, [user])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
      <S.Container>
        <Input
          label="Name"
          value={data.name || ''}
          setValue={(v) => handleData(data, setData, 'name', v, verify, error)}
          error={error.name}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="Email"
          value={data.email || ''}
          setValue={(v) => handleData(data, setData, 'email', v, verify, error)}
          error={error.email}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="Birthdate"
          value={data.birthDate || ''}
          setValue={(v) => {
            v.length <= 10 &&
              handleData(
                data,
                setData,
                'birthDate',
                dateFormatter(v),
                verify,
                error
              )
          }}
          placeholder="dd/mm/yyyy"
          error={error.birthDate}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="Site (optional)"
          value={data.site || ''}
          setValue={(v) => handleData(data, setData, 'site', v, verify, error)}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="Phone"
          value={data.phone || ''}
          setValue={(v) =>
            handleData(
              data,
              setData,
              'phone',
              v.match(/^[-+\d() ]+$/) ? v.match(/^[-+\d() ]+$/)?.join('') : '',
              verify,
              error
            )
          }
          error={error.phone}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="Complete address"
          value={data.address || ''}
          setValue={(v) =>
            handleData(data, setData, 'address', v, verify, error)
          }
          error={error.address}
          withBg
        />
        <View style={{ height: 16 }} />
        <Input
          label="IBAN"
          value={data.bankDigits || ''}
          setValue={(v) =>
            handleData(data, setData, 'bankDigits', v, verify, error)
          }
          error={error.bankDigits}
          withBg
        />
        <View style={{ height: 16 }} />
        <Dropdown
          label="Document type"
          itemList={[
            {
              label: 'Physical person (CPF or PPS)',
              value: '1',
            },
            {
              label: 'Legal entity (CNPJ or CRO)',
              value: '2',
            },
          ]}
          placeholder="Region..."
          value={data.docType?.toString() || null}
          setValue={(v: any) => {
            handleData(data, setData, 'docType', parseInt(v), verify, error)
          }}
          order={1}
          orderInverse={2}
          key={0}
          withBg
        />
        <View style={{ height: 16 }} />
        <Upload
          label="Document file"
          setValue={(v) =>
            handleData(data, setData, 'docImg', v, verify, error)
          }
          value={data.docImg}
        />
        <View style={{ height: 16 }} />
        <Input
          label="Driver's license"
          value={data.doc || ''}
          setValue={(v) => handleData(data, setData, 'doc', v, verify, error)}
          error={error.doc}
          withBg
        />
        <View style={{ height: 16 }} />
        <Button
          disabled={verifyDisabled(error, data) || Object.keys(objDiff(initialData, data)).length <= 0}
          onPress={() => {
            handleSendData()
          }}
        >
          Save
        </Button>
      </S.Container>
    </ScrollView>
  )
}

export default Profile
