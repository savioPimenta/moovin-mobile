import styled from 'styled-components/native'
import { colors } from '../../lib/colors'
import MyText from '../Text'

interface FilePreviewContainerProps {
  isPdf?: boolean
}

export const FilePreviewContainer = styled.View<FilePreviewContainerProps>`
  width: 100%;
`

export const FilePreviewContent = styled.View<FilePreviewContainerProps>`
  align-items: center;
  justify-content: center;
  /* width: ${(props) => (props.isPdf ? '100%' : 'fit-content')}; */
  width: 100%;
  border-radius: 8px;
  background: ${(props) => (props.isPdf ? 'transparent' : 'white')};
  position: relative;
`

export const PreviewTitle = styled(MyText)`
  max-width: 158px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: ${colors.dark3};
  margin-top: 8px;
`

export const PreviewImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  max-height: 250px;
`
