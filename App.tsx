import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewServices from './src/pages/NewServices'
import Chat from './src/pages/Chat'
import FinishedServices from './src/pages/FinishedServices'
import Password from './src/pages/Password'
import Profile from './src/pages/Profile'
import Signin from './src/pages/Signin'
import Wallet from './src/pages/Wallet'
import Service from './src/pages/Service'
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { GeneralProvider } from './src/contexts/generalContext'
import { UserProvider } from './src/contexts/userContext'
import Loading from './src/components/Loading'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CustomHeader from './src/components/CustomHeader'
import { AntDesign } from '@expo/vector-icons'
import { colors } from './src/lib/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { OrdersProvider } from './src/contexts/orderContext'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const screenOptions = (route: any, color: any) => {
  let iconName

  switch (route.name) {
    case 'Home':
      iconName = 'home'
      break
    case 'Finished':
      iconName = 'checkcircleo'
      break
    case 'Wallet':
      iconName = 'wallet'
      break
    default:
      break
  }

  // @ts-ignore
  return <AntDesign name={iconName} color={color} size={24} />
}

function Home() {
  const insets = useSafeAreaInsets()
  return (
    <OrdersProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingTop: 13,
            paddingBottom: insets.bottom + 7.5,
          },
          header: (props) => <CustomHeader props={props} />,
        })}
      >
        <Tab.Screen name="Home" component={NewServices} />
        <Tab.Screen name="Finished" component={FinishedServices} />
        <Tab.Screen name="Wallet" component={Wallet} />
      </Tab.Navigator>
    </OrdersProvider>
  )
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <GeneralProvider>
        <UserProvider>
          <Stack.Navigator initialRouteName="loading">
            <Stack.Screen
              name="signin"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="pass"
              component={Password}
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
              name="service"
              component={Service}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="home"
              component={Home}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="loading"
              component={Loading}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </UserProvider>
      </GeneralProvider>
    </NavigationContainer>
  )
}
