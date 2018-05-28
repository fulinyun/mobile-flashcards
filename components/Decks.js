import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Deck from './Deck'
import { styles } from '../utils/styles'

class Decks extends Component {
  static navigationOptions = () => {
    return {
      title: 'Decks',
    }
  }

  render() {
    const { decks } = this.props.screenProps
    const keys = Object.keys(decks)

    if (keys.length === 0) {
      return <View><Text style={styles.whiteButtonTitle}>Currently there are no decks.</Text></View>
    }

    return (
      <View>
        {keys.map((deckKey) => (
          <TouchableOpacity
            key={deckKey}
            onPress={() => this.props.navigation.navigate(
              'Deck',
              { deckKey }
            )}
            style={styles.whiteButton}
          >
            <Text style={styles.whiteButtonTitle}>{decks[deckKey].title}</Text>
            <Text style={styles.whiteButtonSubtitle}>{`${decks[deckKey].questions.length} card(s)`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

export default Decks
