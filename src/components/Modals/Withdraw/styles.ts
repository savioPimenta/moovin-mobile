import styled from 'styled-components/native'
import { colors } from '../../../lib/colors'
import MyText from '../../Text'

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 32px;
`

export const ContentModal = styled.View`
  width: 100%;
  padding: 32px;
  background: ${colors.white};
  border-radius: 8px;
  align-items: center;
  max-width: 500px;
`

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.border};
`

export const HeaderTitle = styled(MyText)`
  font-size: 24px;
  font-family: 'Poppins_700Bold';
  color: ${colors.dark2};
`

export const CloseButton = styled.Pressable`
  justify-content: center;
`

export const Body = styled.View`
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
  text-align: center;
  align-items: center;
`

export const ValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ValuePrefix = styled(MyText)`
  font-size: 20px;
  color: ${colors.dark1};
`

export const ValueInput = styled.TextInput`
  font-size: 40px;
  width: 86px;
  font-family: 'Poppins_400Regular';
  color: transparent;
  position: absolute;
`

export const ValueSubtitle = styled(MyText)`
  font-size: 12px;
  color: ${colors.dark2};
`

export const Divisor = styled.View`
  width: 100%;
  height: 1px;
  background: ${colors.border};
  margin: 16px 0;
`

export const Title = styled(MyText)`
  width: 100%;
  text-align: left;
  font-size: 14px;
  color: ${colors.dark2};
`

export const Card = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`

export const CardContent = styled.View`
  align-items: flex-start;
  text-align: left;
  color: ${colors.dark2};
  overflow: hidden;
  flex: 1;
`

export const CardTitle = styled(MyText)`
  font-size: 18px;
  font-family: 'Poppins_500Medium';
  color: ${colors.dark1};
`

export const CardText = styled(MyText)`
  font-size: 14px;
  color: ${colors.dark1};
`

export const CardBlackText = styled(MyText)`
  font-family: 'Poppins_700Bold';
  color: ${colors.primary};
`

export const MoovinLogo = styled.View`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: ${colors.white};
  color: ${colors.dark2};
`

export const Button = styled.Pressable`
  text-align: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  border-radius: 5px;
  background: ${colors.primary};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`

export const ButtonText = styled(MyText)`
  font-size: 16px;
  font-family: 'Poppins_700Bold';
  color: ${colors.white};
`
