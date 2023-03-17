import React, { useEffect, useState } from 'react'
import { Keyboard, Platform, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from '@expo/vector-icons/FontAwesome5'
import * as S from './styles'
import { colors } from '../../lib/colors'
import MyText from '../Text'

interface DropdownProps {
  itemList: {
    value: string
    label: string
  }[]
  placeholder?: string
  value: string | null
  setValue: React.Dispatch<React.SetStateAction<string | null>>
  order: number
  orderInverse: number
  label?: string
  withBg?: boolean
}

const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.05,
  shadowRadius: 15,
  elevation: 1,
}

const Dropdown: React.FC<DropdownProps> = ({
  itemList,
  placeholder,
  value,
  setValue,
  order,
  orderInverse,
  label,
  withBg,
}) => {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(itemList)
  const [internalValue, setInternalValue] = useState(value)

  useEffect(() => {
    setInternalValue(value)
  }, [value])

  return (
    <View
      style={[
        {
          maxWidth: '100%',
          position: 'relative',
          height: label && withBg ? 71.5 : 57,
          overflow: 'visible',
          flex: 1,
        },
        Platform.OS === 'ios' && { zIndex: 1000 * order },
      ]}
    >
      <S.BgInput opened={open} />
      {label && (
        <MyText style={{ marginBottom: 6, fontSize: 14, color: colors.dark2 }}>
          {label}
        </MyText>
      )}
      <DropDownPicker
        open={open}
        value={internalValue || null}
        items={items}
        listMode={'SCROLLVIEW'}
        mode="SIMPLE"
        setOpen={setOpen}
        setValue={setInternalValue}
        onChangeValue={(v) => setValue(v)}
        setItems={setItems}
        placeholder={placeholder || 'Selecione um item...'}
        zIndex={1000 * order}
        zIndexInverse={1000 * orderInverse}
        ArrowUpIconComponent={({ style }) => (
          <Icon name="angle-up" size={18} color={colors.dark3} />
        )}
        ArrowDownIconComponent={({ style }) => (
          <Icon name="angle-down" size={18} color={colors.dark3} />
        )}
        showTickIcon={false}
        style={{
          backgroundColor: withBg ? colors.dark4 : colors.white,
          borderColor: withBg ? 'rgb(230, 234, 241)' : 'transparent',
          borderRadius: 8,
          paddingHorizontal: 16,
          height: label && withBg ? 46 : 55,
        }}
        labelStyle={{
          fontFamily: 'Poppins_400Regular',
          color: colors.dark2,
        }}
        dropDownContainerStyle={{
          backgroundColor: colors.lightBorder,
          borderColor: 'transparent',
          borderTopColor: 'rgba(255,255,255,0.2)',
          borderRadius: 8,
        }}
        listItemContainerStyle={{
          height: 55,
          paddingHorizontal: 16,
        }}
        listItemLabelStyle={{
          color: colors.dark2,
          fontFamily: 'Poppins_400Regular',
        }}
        selectedItemContainerStyle={{
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
        selectedItemLabelStyle={{
          fontFamily: 'Poppins_400Regular',
        }}
        placeholderStyle={{
          fontFamily: 'Poppins_400Regular',
          color: colors.dark2,
        }}
        onPress={() => Keyboard.dismiss()}
      />
    </View>
  )
}

export default Dropdown
