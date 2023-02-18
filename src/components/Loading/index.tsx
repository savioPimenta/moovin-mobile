import { BlurView } from 'expo-blur';
import AnimatedLottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Platform, View } from 'react-native';
import LoadingAnimation from '../../../assets/loading.json'

const Loading: React.FC = () => {

  const lottieViewRef = useRef<AnimatedLottieView>(null)

  return <BlurView style={{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#522BCFAA',
    position: 'absolute',
  }} intensity={8}>
    {Platform.OS !== 'ios' && <View style={{backgroundColor: '#522BCFaa', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}/>}
   <AnimatedLottieView
        onLayout={() => {lottieViewRef.current?.play()}}
        autoPlay
        ref={lottieViewRef}
        style={{
          width: 200,
          height: 200,
        }}
        source={LoadingAnimation}
      />
  </BlurView>;
}

export default Loading;