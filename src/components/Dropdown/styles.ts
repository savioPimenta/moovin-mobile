import styled from 'styled-components/native';
import { colors } from '../../lib/colors';

interface BgInputProps {
  opened?: boolean
}

export const BgInput = styled.View<BgInputProps>`
  border-radius: 10px;
  border-bottom-left-radius: ${props => props.opened ? '0' : '10px'};
  border-bottom-right-radius: ${props => props.opened ? '0' : '10px'};
  height: 55px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  background: ${colors.white};
`;
