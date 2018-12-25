import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
// import Video from 'react-native-video';
import SquareTicker from './SquareTicker';
import TempoSelect from './TempoSelect';
// import woodblockSound from './woodblock.wav';
import styles from './App.style';
import Sound from 'react-native-sound';


export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      soundSrc: undefined,
      playing: false,
      soundPath: 'woodblock.wav',
      intervalID: undefined,
      tempoVal: 120
    }
  }

  componentWillMount() {
    Sound.setCategory('Playback');
    var wbSound = new Sound(this.state.soundPath, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + wbSound.getDuration() + ' number of channels: ' + wbSound.getNumberOfChannels());
    });
    this.setState({ soundSrc: wbSound })
  }

  // multiple setState philosophy?
  togglePlaying = () => {
    var tempSound = this.state.soundSrc; // use wbSound for this name or too confusing?
    if (!this.state.playing) {
      var intervalID = setInterval(() => {
        tempSound.play()
      }, ((60/this.state.tempoVal)*1000)); // should this calculation happen somewhere else?
      this.setState({ intervalID: intervalID }); // how to properly handle these setStates
    } else {
      clearInterval(this.state.intervalID);
      tempSound.stop() // this may not be necessary
      this.setState({ intervalID: null }); // possible to combine with lower setState?
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
      {/* <Video source={ woodblockSound } /> */}
      <TempoSelect 
        tempoVal={this.state.tempoVal}
        handleSlider={this.handleSlider.bind(this)}
      />
    </View>
  );
}
