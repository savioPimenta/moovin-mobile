import styled from 'styled-components/native'
import { colors } from '../../lib/colors'

export const Content = styled.View``

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 8px;
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
  align-items: center;
  justify-content: space-between;
  padding: 24px 26px;
  border-bottom: 1px solid ${colors.border};

  > h1 {
    font-size: 24px;
    color: ${colors.secondary};
  }

  > View {
    background: ${colors.secondary};
    color: ${colors.white};
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 32px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    align-items: center;
  }
`

interface BodyProps {
  isIconList?: boolean
}

export const Body = styled.View<BodyProps>`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 16px;
  padding: 24px 26px;

  @media (max-width: 820px) {
    grid-template-columns: ${(props) =>
      props.isIconList ? 'repeat(auto-fit, minMax(124px, 1fr))' : '1fr 1fr'};
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

interface BodyCardProps {
  isBig?: boolean
}

export const BodyCard = styled.View<BodyCardProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 24px 26px;
  gap: 8px;
  background: rgba(0, 0, 0, 0.05);
  text-align: center;

  & > span:first-child {
    font-size: ${(props) => (props.isBig ? 16 : 28)}px;
    color: ${colors.dark2};
    flex: 1;
    @media (max-width: 820px) {
      font-size: ${(props) => (props.isBig ? 16 : 24)}px;
    }
  }

  & > span:last-of-type {
    font-size: 16px;
    font-weight: 600;
    color: ${colors.primary};
  }

  & > section {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 64px;
    background: ${colors.primary};
    color: ${colors.white};
    margin-bottom: 8px;
  }
`

export const FurnitureList = styled.View`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;

  > View {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 100px;

    > View {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 64px;
      background: ${colors.primary};

      > svg {
        width: 28px;
        height: 28px;
        > path {
          stroke: white;
        }
      }

      > View {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        height: 24px;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 600;
        background: ${colors.secondary};
        color: ${colors.white};
      }
    }

    > span {
      color: ${colors.dark2};
    }
  }
`

export const Footer = styled.View`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 16px;
  padding-bottom: 32px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`
interface ButtonProps {
  secondary?: boolean
}

export const Button = styled.Pressable<ButtonProps>`
  color: var(--${(props) => (props.secondary ? 'primary' : 'white')});
  background: ${(props) =>
    props.secondary ? 'transparent' : '${colors.primary}'};
  font-size: 16px;
  font-weight: 600;
  padding: 12px 32px;
  border-radius: 5px;
  cursor: pointer;
`
