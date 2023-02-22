import styled from 'styled-components/native'
import MyText from '../../components/Text'
import { colors } from '../../lib/colors'

export const Content = styled.ScrollView``

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 8px;
  margin: 32px;
`
export const BackButton = styled.Pressable`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.dark1};
  opacity: 0.5;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    opacity: 1;
  }
`

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px 26px;
  border-bottom: 1px solid ${colors.border};
  gap: 16px;
`

export const HeaderTitle = styled(MyText)`
  font-size: 20px;
  color: ${colors.secondary};
  text-align: center;
  margin-right: 12px;
  font-family: Poppins_700Bold;
`

export const HeaderLabelContainer = styled.View`
  background: ${colors.secondary};
  padding: 8px 16px;
  border-radius: 32px;
`

export const HeaderLabel = styled(MyText)`
  color: ${colors.white};
  font-size: 13px;
  font-family: Poppins_700Bold;
`

interface BodyProps {
  isIconList?: boolean
}

export const Body = styled.View<BodyProps>`
  padding: 0 26px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

interface BodyCardProps {
  isBig?: boolean
  isSpec?: boolean
}

export const BodyCard = styled.View<BodyCardProps>`
  width: 100%;
  margin-bottom: 16px;
  align-items: center;
  border-radius: 5px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: ${(props) =>
    props.isSpec ? '344px' : props.isBig ? '1200px' : '524px'};
`

export const CardValue = styled(MyText)<BodyCardProps>`
  color: ${colors.dark2};
  font-size: ${(props) => (props.isBig ? 16 : 24)}px;
  text-align: center;
`

export const CardLabel = styled(MyText)<BodyCardProps>`
  font-size: 16px;
  color: ${colors.primary};
  font-family: Poppins_700Bold;
  margin-top: 8px;
`

export const FurnitureList = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
`

export const FurnitureContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
`

export const FurnitureContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background: ${colors.primary};
`

export const FurnitureIcon = styled.View`
  width: 28px;
  height: 28px;
`

export const FurnitureQtd = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  background: ${colors.secondary};
`

export const FurnitureTitle = styled(MyText)`
  color: ${colors.dark2};
`

export const CardSpecs = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background: ${colors.primary};
  margin-bottom: 8px;
`

export const SpecsTitle = styled(MyText)`
  font-family: Poppins_700Bold;
  color: ${colors.white};
`

export const Footer = styled.View`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 32px 32px 32px;
  flex-direction: column-reverse;
  align-items: stretch;
`
interface ButtonProps {
  secondary?: boolean
}

export const Button = styled.Pressable<ButtonProps>`
  background: ${(props) => (props.secondary ? 'transparent' : colors.primary)};
  padding: 12px 32px;
  border-radius: 5px;
  align-items: center;
`

export const ButtonText = styled(MyText)<ButtonProps>`
  font-size: 16px;
  color: ${(props) => (props.secondary ? colors.primary : colors.white)};
  font-family: Poppins_700Bold;
`
