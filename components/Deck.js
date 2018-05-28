import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { AppLoading } from 'expo'
import { styles } from '../utils/styles'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.deckKey,
    }
  }

  render() {
    const { navigation, screenProps } = this.props
    const { deckKey } = navigation.state.params
    const { decks } = screenProps
    const deck = decks[deckKey]

    return deck ? (
      <View>
        <Text style={styles.whiteButtonTitle}>{deck.title}</Text>
        <Text style={styles.whiteButtonSubtitle}>{deck.questions.length} card(s)</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'AddCard',
            { deckKey }
          )}
          style={styles.whiteButton}
        >
          <Text style={styles.whiteButtonTitle}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'Quiz',
            { deckKey }
          )}
          style={styles.blackButton}
          disabled={deck.questions.length === 0}
        >
          <Text style={styles.blackButtonTitle}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    ): <AppLoading />
  }
}

export default Deck
