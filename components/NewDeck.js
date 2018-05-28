import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { AppLoading } from 'expo'
import { styles } from '../utils/styles'
import { newDeck } from '../utils/api'

class NewDeck extends Component {
  state = {
    title: '',
  }

  static navigationOptions = () => {
    return {
      title: 'New Deck'
    }
  }

  newDeckAndToDeck = () => {
    const { navigation, screenProps } = this.props
    const { decks, updateDecks } = screenProps
    const { title } = this.state
    const deckKey = title

    if (deckKey && !decks[deckKey]) {
      newDeck(deckKey, title)
        .then(_ => updateDecks())
        .then(_ => navigation.navigate(
          'Deck',
          { deckKey },
        ))
    }
  }

  render() {
    const { decks } = this.props.screenProps
    const { title } = this.state

    return (
      <View>
        <Text style={styles.whiteButtonTitle}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          placeholder='Deck Title'
          onChangeText={(title) => this.setState({ title })}
        />
        <TouchableOpacity
          onPress={this.newDeckAndToDeck}
          style={styles.blackButton}
          disabled={!!decks[title]}
        >
          <Text style={styles.blackButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default NewDeck
