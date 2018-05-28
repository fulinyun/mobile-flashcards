import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput } from 'react-native'
import { styles } from '../utils/styles'
import { addCard } from '../utils/api'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  addCardAndToDeck = () => {
    const { navigation, screenProps } = this.props
    const { deckKey } = navigation.state.params
    const { decks, updateDecks } = screenProps
    const { question, answer } = this.state

    addCard(deckKey, question, answer)
      .then(_ => updateDecks())
      .then(_ =>
        navigation.navigate(
          'Deck',
          { deckKey }
        )
      )
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          placeholder='Question'
          onChangeText={(question) => this.setState({ question })}
        />
        <TextInput
          style={styles.input}
          placeholder='Answer'
          onChangeText={(answer) => this.setState({ answer })}
        />
        <TouchableOpacity
          onPress={this.addCardAndToDeck}
          style={styles.blackButton}
        >
          <Text style={styles.blackButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AddCard
