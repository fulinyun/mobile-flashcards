import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const rootKey = 'root'

const notificationKey = 'notification'

export async function newDeck (deckKey, title) {
  try {
    await AsyncStorage.mergeItem(rootKey, JSON.stringify({[deckKey]: { title, questions: [] }}))
  } catch (error) {
    console.log("Error creating new deck: " + error)
  }
}

export async function addCard (deckKey, question, answer) {
  try {
    const stringifiedDecks = await AsyncStorage.getItem(rootKey)
    const oldDecks = JSON.parse(stringifiedDecks)
    const oldDeck = oldDecks[deckKey]
    const oldQuestions = oldDeck.questions
    await AsyncStorage.mergeItem(
      rootKey,
      JSON.stringify({
        [deckKey]: {
          ...oldDeck,
          questions: [...oldQuestions, { question, answer }],
        },
      }))
  } catch (error) {
    console.log("Error adding card: " + error)
  }
}

export async function initStorage (data = {}) {
  try {
    await AsyncStorage.setItem(rootKey, JSON.stringify(data))
  } catch (error) {
    console.log("Error initializing storage: " + error)
  }
}

export async function getDecks () {
  try {
    let decks = await AsyncStorage.getItem(rootKey)
    if (decks) {
      return JSON.parse(decks)
    }
    await initStorage()
    return {}
  } catch (error) {
    console.log("Error getting decks: " + error)
  }
}

export async function clearLocalNotification () {
  try {
    await AsyncStorage.removeItem(notificationKey)
    await Notifications.cancelAllScheduledNotificationsAsync()
  } catch (error) {
    console.log("Error clearing local notification: " + error)
  }
}

function createNotification () {
  return {
    title: 'Take a quiz!',
    body: "👋 don't forget to take a quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export async function setLocalNotification () {
  try {
    const stringifiedNotification = await AsyncStorage.getItem(notificationKey)
    const notification = JSON.parse(stringifiedNotification)
    if (notification === null) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (status === 'granted') {
        await Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)

        await Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: tomorrow,
            repeat: 'day',
          }
        )

        await AsyncStorage.setItem(notificationKey, JSON.stringify(true))
      }
    }
  } catch (error) {
    console.log("Error setting local notification: " + error)
  }
}
