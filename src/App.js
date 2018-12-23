import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import Video from 'react-native-video';
import SquareTicker from './SquareTicker';
import woodblockSound from './woodblock.wav';
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
      <Video source={ woodblockSound } />
    </View>
  );
}
