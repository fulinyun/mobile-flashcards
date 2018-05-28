import { StyleSheet } from 'react-native'
import { white, black, green, red, gray } from './colors'

export const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 20,
  },
  whiteButton: {
    borderWidth: 1,
    borderColor: black,
    backgroundColor: white,
    borderRadius: 4,
    padding: 20,
  },
  whiteButtonTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  whiteButtonSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: gray,
  },
  blackButton: {
    backgroundColor: black,
    borderRadius: 4,
    padding: 20,
  },
  blackButtonTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: white,
  },
  greenButton: {
    backgroundColor: green,
    borderRadius: 4,
    padding: 20,
  },
  redButton: {
    backgroundColor: red,
    borderRadius: 4,
    padding: 20,
  },
  input: {
    height: 80,
    borderColor: gray,
    borderWidth: 1,
  },
})
