import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from '../utils/styles'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class Quiz extends Component {
  state = {
    index: 0,
    showQuestion: true,
    correctCount: 0,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  flipCard = () => {
    this.setState({ showQuestion: !this.state.showQuestion })
  }

  correct = () => {
    this.setState({
      index: this.state.index + 1,
      correctCount: this.state.correctCount + 1,
      showQuestion: true,
    })
  }

  incorrect = () => {
    this.setState({ index: this.state.index + 1, showQuestion: true })
  }

  restart = () => {
    this.setState({ index: 0, showQuestion: true, correctCount: 0 }, () => this.updateNotification())
  }

  back = () => {
    const { navigation } = this.props
    const { deckKey } = navigation.state.params

    this.setState({ index: 0, showQuestion: true, correctCount: 0 }, () => {
      this.updateNotification().then(_ => navigation.navigate('Deck', { deckKey }))
    })
  }

  updateNotification = () => clearLocalNotification().then(_ => setLocalNotification())

  render() {
    const { navigation, screenProps } = this.props
    const { decks } = screenProps
    const { deckKey } = navigation.state.params
    const questions = decks[deckKey].questions
    const totalQuestions = questions.length

    const { index, showQuestion, correctCount } = this.state

    return (
      index === totalQuestions ?
      (
        <View>
          <Text style={styles.whiteButtonTitle}>
            Result: {correctCount}/{totalQuestions}
          </Text>
          <TouchableOpacity
            onPress={this.restart}
            style={styles.whiteButton}
          >
            <Text style={styles.whiteButtonTitle}>
              Restart Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.back}
            style={styles.whiteButton}
          >
            <Text style={styles.whiteButtonTitle}>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      ) :
      (
        <View>
          <Text>{index + 1}/{totalQuestions}</Text>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            {showQuestion ? questions[index].question : questions[index].answer}
          </Text>
          <TouchableOpacity
            onPress={this.flipCard}
            style={styles.whiteButton}
          >
            <Text style={styles.whiteButtonTitle}>
              {showQuestion ? 'Answer' : 'Question'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.correct}
            style={styles.greenButton}
          >
            <Text style={styles.blackButtonTitle}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.incorrect}
            style={styles.redButton}
          >
            <Text style={styles.blackButtonTitle}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    )
  }
}

export default Quiz
