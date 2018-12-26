import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import SquareTicker from './SquareTicker';
import TempoSelect from './TempoSelect';
import styles from './App.style';
import Sound from 'react-native-sound';

// - SP - needs to rename sounds

let wbSound = null;
let clickSound = null;

export default class App extends PureComponent {
  state = {
    soundSrc: undefined,
    playing: false,
    soundPath: ['woodblock.wav', 'woodblock2.wav'],
    intervalID: undefined,
    tempoVal: 120,
    playingIndex: 0
  }

  componentWillMount() {
    Sound.setCategory('Playback');
    wbSound = new Sound(this.state.soundPath[0], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + wbSound.getDuration() + ' number of channels: ' + wbSound.getNumberOfChannels());
    });
    clickSound = new Sound(this.state.soundPath[1], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + clickSound.getDuration() + ' number of channels: ' + clickSound.getNumberOfChannels());
    });
    this.setState({ soundSrc: [wbSound, clickSound] });
  }

  // multiple setState philosophy?
  togglePlaying = () => { // starts pattern on 2nd beat, must fix
    if (!this.state.playing) {
      var intervalID = setInterval(() => {
        var tempIndex = this.state.playingIndex;
        if (tempIndex === 0) {
          wbSound.play();
        } else {
          clickSound.play();
        }
        this.setState({ playingIndex: (tempIndex + 1) % 4 === 0 ? 0 : tempIndex + 1}, () => {
          console.log(this.state.playingIndex); // logs current beat
        });
      }, ((60/this.state.tempoVal)*1000));
      this.setState({ intervalID: intervalID }); 
    } else {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: null });
    }
    this.setState(priorState => ({
      playing: !priorState.playing,
    }));
  };

  handleSlider = (value) => {
    this.setState({ tempoVal: value });
  }

  render = () => (
    <View style={ styles.container }>
      <Button
        onPress={ this.togglePlaying }
        title={ this.state.playing ? 'stop' : 'start' }
      />
      <SquareTicker 
        playing={ this.state.playing }
        tempoVal={this.state.tempoVal}  
      />
      <TempoSelect 
        tempoVal={this.state.tempoVal}
        handleSlider={this.handleSlider.bind(this)}
      />
      {/* <MeterSelect /> */}
    </View>
  );
}
