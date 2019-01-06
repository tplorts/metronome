import React, { PureComponent } from 'react';
import { View, Button, Text } from 'react-native';
import styles from './App.style';

export default class App extends PureComponent {
  state = {
    tempo: 120,
    meter: 4,
    quarterAccentMIDINote: 96,
    quarterMIDINote: 88,
  };

  componentWillMount() {}

  
  render = () => (
    <View style={ styles.container }>
      <Text>Start Here</Text>
    </View>
  );
}
