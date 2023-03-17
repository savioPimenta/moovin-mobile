import React, { useState, useEffect, useRef } from 'react'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useUser } from '../../contexts/userContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGeneral } from '../../contexts/generalContext'
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

async function registerForPushNotificationsAsync(showError: (e: any) => void) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    showError('Failed to get token for notifications')
    return
  }
  const token = (await Notifications.getExpoPushTokenAsync({})).data
  await AsyncStorage.setItem('@Moovin:expo_id', token)

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

interface NotificationWrapperProps {
  children: any
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
  children,
}) => {
  const { showError } = useGeneral()
  const navigate = useNavigation()
  const notificationListener = useRef<Notifications.Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync(showError)

    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        const notif = notification.notification.request.content.data
        if (notif) {
          switch (notif.route) {
            case 'chat':
              navigate.dispatch(
                StackActions.push('chat', {
                  id: notif.data.id,
                  customerId: notif.data.customerId,
                })
              )
              break
            case 'newOrder':
              navigate.dispatch(CommonActions.reset({
                index: 1,
                routes: [{name: 'home'}]
              }))
              break
          }
        }
      })

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
    }
  }, [])

  return <>{children}</>
}

export default NotificationWrapper
