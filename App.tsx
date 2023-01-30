import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewServices from './src/pages/NewServices'
import Chat from './src/pages/Chat'
import CurrentServices from './src/pages/CurrentServices'
import FinishedServices from './src/pages/FinishedServices'
import Password from './src/pages/Password'
import Profile from './src/pages/Profile'
import Signin from './src/pages/Signin'
import Signup from './src/pages/Signup'
import Wallet from './src/pages/Wallet'
import Service from './src/pages/Service'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signin">
        <Stack.Screen
          name="signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pass"
          component={Password}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="new"
          component={NewServices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="current"
          component={CurrentServices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="finished"
          component={FinishedServices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="service"
          component={Service}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
