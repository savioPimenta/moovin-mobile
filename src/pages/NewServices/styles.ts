import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  margin-top: -10%;
`

export const ServicesList = styled.FlatList`
  padding: 0 32px;
`

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 10%;
  padding-top: 32px;
  z-index: 1001;
  max-width: 600px;
`
