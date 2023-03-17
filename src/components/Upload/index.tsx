import React from 'react'
import { Pressable, View } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

import * as S from './styles'
import { colors } from '../../lib/colors'
import MyText from '../Text'

interface UploadProps {
  setValue: (v: any) => any
  value?: any
  label?: string
}

const Upload: React.FC<UploadProps> = ({ setValue, value, label }) => {
  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    })

    if (result.type === 'success') {
      setValue(result)
    }
  }

  return (
    <View>
      {label && (
        <MyText style={{ marginBottom: 6, fontSize: 14, color: colors.dark2 }}>
          {label}
        </MyText>
      )}
      <Pressable
        onPress={_pickDocument}
        style={{
          width: '100%',
          padding: 16,
          backgroundColor: colors.dark4,
          borderColor: 'rgb(230, 234, 241)',
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        {value ? (
          <FilePreview file={value} />
        ) : (
          <Feather name="upload-cloud" size={48} color={colors.dark3} />
        )}
      </Pressable>
    </View>
  )
}

interface FilePreviewInterface {
  file: DocumentPicker.DocumentResult | string
}

const FilePreview: React.FC<FilePreviewInterface> = ({ file }) => {
  let type
  if (typeof file === 'string') {
    type = file.slice(-4) === '.pdf' ? 'application/pdf' : 'url'
  } else {
    if (file.type === 'success') {
      type = file.mimeType
    } else {
      type = 'application/pdf'
    }
  }

  return (
    <S.FilePreviewContainer isPdf={true}>
      <S.FilePreviewContent isPdf={true}>
        {type === 'application/pdf' ? (
          <>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={48}
              color={colors.dark3}
            />
            <S.PreviewTitle style={{ fontSize: 18, fontFamily: 'Poppins_500Medium' }}>
              Uploaded file
            </S.PreviewTitle>
            <S.PreviewTitle style={{ marginTop: 0 }}>
              Press to change file
            </S.PreviewTitle>
          </>
        ) : type === 'url' ? (
          <S.PreviewImage
            resizeMode="cover"
            borderRadius={8}
            source={{
              uri: file as string,
            }}
          />
        ) : (
          typeof file !== 'string' && (
            <S.PreviewImage
              resizeMode="cover"
              borderRadius={8}
              source={{
                // @ts-ignore
                uri: file.uri,
              }}
            />
          )
        )}
      </S.FilePreviewContent>
    </S.FilePreviewContainer>
  )
}

export default Upload
