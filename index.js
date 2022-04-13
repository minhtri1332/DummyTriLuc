/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Text, TextInput, TouchableOpacity} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
TouchableOpacity.defaultProps = {
  ...(TouchableOpacity.defaultProps || {}),
  activeOpacity: 0.6,
};

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  maxFontSizeMultiplier: 1.3,
  fontFamily: 'Roboto-Regular',
};

TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  maxFontSizeMultiplier: 1.3,
  fontFamily: 'Roboto-Regular',
};
AppRegistry.registerComponent(appName, () => App);
