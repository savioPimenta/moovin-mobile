import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { channels, useGeneral } from '../../contexts/generalContext'
import { getCustomer, getMessages, sendMessage } from '../../services/message'

import * as S from './styles'
import { colors } from '../../lib/colors'
import MyText from '../../components/Text'
import { Platform, Pressable, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import KeyboardListener from '../../components/KeyboardListener'

interface ChatComponentProps {
  route: any
}

interface ChatProps {
  id: number
  userId: number
  message: string
  orderId: number
  sender: 1 | 2
  order: {
    customer: {
      name: string
    }
  }
  created_at: string
  updated_at: string
}

const Chat: React.FC<ChatComponentProps> = ({ route }) => {
  const { id, customerId } = route?.params
  const navigate = useNavigation()
  const insets = useSafeAreaInsets()

  const { setIsLoading, showError } = useGeneral()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState<ChatProps[]>([] as ChatProps[])
  const scrollViewRef = useRef<ScrollView>(null)
  const hasPusher = useRef(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)

  const handleGetData = async () => {
    try {
      const res = await getMessages(id)
      setResponse(res.messages.reverse())
    } catch (error) {
      showError(error)
    }
  }
  const handleGetInitialData = async () => {
    try {
      const customerRes = await getCustomer(customerId)
      navigate.setOptions({ headerTitle: customerRes.user.name })
    } catch (error) {
      showError(error)
    }
  }

  const handleSendMessage = async () => {
    if (message !== '' && !loading) {
      setLoading(true)
      try {
        setMessage('')
        await sendMessage(id, message)
      } catch (error) {
        showError(error)
      }
      setLoading(false)
    }
  }

  const initializePusher = () => {
    if (hasPusher.current === false) {
      const channel = channels.subscribe('moovin-realtime')
      channel.bind('has-new-messages-' + id, () => {
        try {
          handleGetData()
        } catch (error) {
          showError(error)
        }
      })
      hasPusher.current = true
      return channel
    }
  }

  useLayoutEffect(() => {
    if (id) {
      setIsLoading(true)
      handleGetInitialData()
      handleGetData()
      initializePusher()
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (keyboardOpen) {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }
  }, [keyboardOpen])

  return (
    <KeyboardListener
      onWillShow={() => {
        setKeyboardOpen(true)
      }}
      onWillHide={() => {
        setKeyboardOpen(false)
      }}
    >
      <S.Container>
        <S.ChatContainer
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={insets.bottom + 41 + 12}
        >
          <S.ChatBody
            ref={scrollViewRef}
            // contentContainerStyle={{ alignSelf: 'center' }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            <View
              style={{
                maxWidth: 600,
                width: '100%',
                alignItems: 'stretch',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {response.map((item, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: 'row',
                      marginTop: 16,
                    }}
                  >
                    {item.sender === 2 && <View style={{ flex: 1 }} />}
                    <S.Message key={i} partner={item.sender === 1}>
                      <MyText
                        style={item.sender === 1 && { color: colors.dark2 }}
                      >
                        {item.message}
                      </MyText>
                    </S.Message>
                    {item.sender === 1 && <View style={{ flex: 1 }} />}
                  </View>
                )
              })}
            </View>
            <View style={{ height: 41 }} />
          </S.ChatBody>
          <S.ChatFooter style={{ paddingBottom: insets.bottom }}>
            <S.TextArea
              placeholder={'Enter your message...'}
              value={message}
              onChangeText={setMessage}
              multiline={true}
            />
            <View style={{ width: 16 }} />
            <Pressable onPress={handleSendMessage}>
              <FontAwesome name="send" size={22} color={colors.primary} />
            </Pressable>
          </S.ChatFooter>
        </S.ChatContainer>
      </S.Container>
    </KeyboardListener>
  )
}

export default Chat
