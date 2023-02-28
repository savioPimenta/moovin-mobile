import styled from 'styled-components/native'
import { colors } from '../../lib/colors'

export const Container = styled.View`
  flex: 1;
`

export const ChatContainer = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  overflow: hidden;
`

export const ChatBody = styled.ScrollView`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 24px;
  gap: 16px;
  flex: 1;
  max-height: 100%;
`

interface MessageProps {
  partner?: boolean
}

export const Message = styled.View<MessageProps>`
  display: flex;
  /* width: fit-content; */
  padding: 8px 16px;
  border-radius: 400px;
  text-align: right;
  margin-left: auto;
  background: ${colors.primary};

  ${(props) =>
    props.partner &&
    `
    background: ${colors.white};
    text-align: left;
    margin-left: 0;
  `}
`

export const ChatFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: ${colors.white};
  padding: 0 24px;
`

export const TextArea = styled.TextInput`
  flex: 1;
  min-height: 41px;
  resize: none;
  font-size: 16px;
  padding: 12px;
  background: ${colors.dark4};
  border-radius: 8px;
  margin: 12px 0;
  max-height: 120px;
`
