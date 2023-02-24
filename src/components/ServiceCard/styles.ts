import styled from 'styled-components/native'
import { colors } from '../../lib/colors'
import MyText from '../Text'

export const ServiceCard = styled.View<{ isSingle: boolean }>`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 5px;
  padding: 24px 26px;
  color: ${colors.dark2};
  margin: 16px 32px;
  max-width: 600px;
  align-self: center;
  width: 100%;
`

export const ButtonsContainer = styled.View`
  flex-direction: row;
`

export const CardContent = styled.View`
  margin-bottom: 8px;
`

export const CardTitle = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const CardTagContainer = styled.View`
  display: flex;
`

export const CardFurnitureContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const CardFurnitureContent = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin: 10px 8px;
  background: ${colors.quartenary};
`

export const CardFurnitureQtd = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  position: absolute;
  right: -8px;
  top: -8px;
  background: ${colors.primary};
`

export const CardTag = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
  background: ${colors.quartenary};
  border-radius: 5px;
`

export const CardTagIcon = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 28px;
  background: ${colors.secondary};
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`

export const CardTagTitle = styled(MyText)`
  font-size: 13px;
  font-family: 'Poppins_500Medium';
  color: ${colors.dark2};
`

export const Divisor = styled.View`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  background: ${colors.lightBorder};
`

export const CardRow = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`

export const CardRowTitle = styled(MyText)`
  font-family: 'Poppins_700Bold';
  margin-right: 8px;
  color: ${colors.dark2};
`

export const CardRowContent = styled(MyText)`
  text-align: right;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${colors.dark3};
`

export const RefuseButton = styled.Pressable`
  font-size: 16px;
  padding: 8px 16px;
`

export const AcceptButton = styled.Pressable`
  color: ${colors.white};
  background: ${colors.primary};
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`
