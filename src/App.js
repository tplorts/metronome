import React, { PureComponent } from 'react';
import { View, Button } from 'react-native';
import SquareTicker from './SquareTicker';
import TempoSelect from './TempoSelect';
import MeterSelect from './MeterSelect';
import styles from './App.style';
import Sound from 'react-native-sound';
import SubdivisionSlider from './SubdivisionSlider';
import QuarterVolume from './QuarterVolume';

// --- Does MeterSelect and TempoSelect require their own state, or can everything be handled through props?
// - Performance issues at beginning 500ms of playback - something runs in the main thread in the beginning, delaying execution of 1st (maybe 2nd) ticks
// - Making tempo change dynamically - would have to quickly clear and restart setInterval, but could be a mess if slider is read continuously

// global sound sources
let tickSound = null;
let clickSound = null;
let chickSound = null;

export default class App extends PureComponent {
  state = {
    soundSrc: undefined, // stores an array of Sound objects
    playing: false,
    soundPath: ['woodblock.wav', 'woodblock2.wav', 'woodblock3.wav'],
    intervalID: undefined, // tracks current setInterval session
    tempoVal: 120,
    playingIndex: 0, // internal index for playback
    meterVal: 4,
    subdivisionVolume: 5,
    quarterVolume: 5
  }

  componentWillMount() {
    Sound.setCategory('Playback');
    // - use iteration to eliminate excess, redundant code
    tickSound = new Sound(this.state.soundPath[0], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + tickSound.getDuration() + ' number of channels: ' + tickSound.getNumberOfChannels());
    });
    clickSound = new Sound(this.state.soundPath[1], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + clickSound.getDuration() + ' number of channels: ' + clickSound.getNumberOfChannels());
    });
    chickSound = new Sound(this.state.soundPath[2], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load sound', error);
        return;
      }
      // successful load
      console.log("duration in seconds: " + clickSound.getDuration() + ' number of channels: ' + clickSound.getNumberOfChannels());
    });
    this.setState({ soundSrc: [tickSound, clickSound, chickSound] });
  }

  // multiple setState philosophy?
  togglePlaying = () => { // starts pattern on 2nd beat, must fix
    if (!this.state.playing) {
      var intervalID = setInterval(() => {
        var tempIndex = this.state.playingIndex;
        if (tempIndex === 0) {
          tickSound.play();
        } else if (tempIndex % 2 === 0) { // quarter note pulse
          chickSound.play();
        } else { // subdivisions
          clickSound.play();
        }
        this.setState({ playingIndex: (tempIndex + 1) % (this.state.meterVal * 2) === 0 ? 0 : tempIndex + 1}, () => {
          console.log(this.state.playingIndex); // logs current beat
        });
      }, (((30)/this.state.tempoVal)*1000)); // first number sets the resolution of setInterval - quarters(60), eighths(30), sixteenths(15)...
      this.setState({ intervalID: intervalID }); 
    } else {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: null });
    }
    this.setState(priorState => ({
      playing: !priorState.playing,
    }));
  };

  handleTempoSlider = (value) => { // not dynamic
    this.setState({ tempoVal: value });
  }

  handleMeterSlider = (value) => {
    this.setState({ meterVal: value });
  }

  handleQuarterVolume = (value) => {
    tickSound.setVolume(value/10);
    chickSound.setVolume(value/10);
    this.setState({ quarterVolume: value })
  }

  handleSubdivisionSlider = (value) => {
    clickSound.setVolume(value/10);
    this.setState({ subdivisionVolume: value })
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
        handleTempoSlider={this.handleTempoSlider.bind(this)}
      />
      <MeterSelect 
        handleMeterSlider={this.handleMeterSlider.bind(this)}
        meterVal={this.state.meterVal}
      />
      <QuarterVolume
        quarterVolume={this.state.quarterVolume}
        handleQuarterVolume={this.handleQuarterVolume.bind(this)}
      />
      <SubdivisionSlider 
        subdivisionVolume={this.state.subdivisionVolume}
        handleSubdivisionSlider={this.handleSubdivisionSlider.bind(this)}
      />
    </View>
  );
}
