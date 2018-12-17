import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import SquareTicker from './SquareTicker';
import styles from './App.style';


export default class App extends PureComponent {
  state = {
    playing: false,
  };

  togglePlaying = () => {
    this.setState(priorState => ({
      playing: !priorState.playing,
    }));
  };

  render = () => (
    <View style={ styles.container }>
      <Button
        onPress={ this.togglePlaying }
        title={ this.state.playing ? 'stop' : 'start' }
      />
      <SquareTicker playing={ this.state.playing } />
    </View>
  );
}
