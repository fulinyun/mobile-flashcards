import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { AppLoading } from 'expo'
import { AsyncStorage } from 'react-native'

import { purple, white } from './utils/colors'
import Decks from './components/Decks'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { initStorage, getDecks, setLocalNotification, clearLocalNotification } from './utils/api'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const DeckNavigator = createStackNavigator({
  Decks: {
    screen: Decks,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    },
  },
})

const MainNavigator = createBottomTabNavigator({
  DeckNavigator: {
    screen: DeckNavigator,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: purple,
    labelStyle: {
      fontSize: 30,      
    },
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    },
  },
})

const data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      }
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ],
  },
}

export default class App extends Component {
  state = {
    ready: false,
    decks: {},
  }

  componentDidMount () {
    clearLocalNotification()
    .then(_ => initStorage(data))
      .then(_ => getDecks())
      .then(decks => this.setState({ ready: true, decks }))
      .then(_ => setLocalNotification())
  }

  updateDecks = () => {
    getDecks().then(decks => this.setState({ decks }))
  }

  render() {
    const { decks, ready } = this.state

    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        {ready ?
          <MainNavigator screenProps={{ decks, updateDecks: this.updateDecks }} /> :
          <AppLoading />}
      </View>
    )
  }
}
