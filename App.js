import React, { PureComponent } from 'react';
import {
  Button, Text, Slider, View, NativeModules,
} from 'react-native';
import styles from './src/App.style';
import Metronome from './src/MetronomeModule';

// ?? Why does NativeModules.Metronome not need to be called in ios build?

export default class App extends PureComponent {
  state = {
    tempo: 120,
    meter: 4,
    eighthNoteVolume: 0,
  };

  componentWillMount() {
    Metronome.prepareToPlay();
  }

  componentDidMount() {
    console.log(Metronome);
  }

  pressPlay = () => {
    Metronome.pressPlay();
  };

  pressStop = () => {
    Metronome.pressStop();
  };

  // ?? Should NM.M.onTempoChange() be inside the callback of setState()?
  onTempoChange(value) {
    this.setState({ tempo: value }, () => {
      console.log(`tempo: ${value}`);
      Metronome.onTempoChange(value);
    });
  }

  onMeterChange(value) {
    this.setState({ meter: value }, () => {
      console.log(`meter: ${this.state.meter}/4`);
      Metronome.onMeterChange(value);
    });
  }

  onEighthNoteVolumeChange(value) {
    this.setState({ eighthNoteVolume: value }, () => {
      console.log(`eighth note volume: ${this.state.eighthNoteVolume}`);
      // Metronome.onEighthNoteVolumeChange(parseInt(value, 10));
      NativeModules.Metronome.onEighthNoteVolumeChange(parseInt(value, 10));
    });
  }

  render = () => (
    <View style={ styles.container } nativeID='main'>
      <Text>Tempo: { this.state.tempo }</Text>
      <Slider
        style={ styles.slider }
        minimumValue={ 30 }
        maximumValue={ 300 }
        step={ 1 }
        value={ this.state.tempo }
        onValueChange={ (value) => this.onTempoChange(value) }
      />
      <Text>Meter: { this.state.meter }/4</Text>
      <Slider
        style={ styles.slider }
        minimumValue={ 1 }
        maximumValue={ 9 }
        step={ 1 }
        value={ this.state.meter }
        onValueChange={ (value) => this.onMeterChange(value) }
      />
      <Button
        title='Play'
        onPress={ this.pressPlay }
      />
      <Button
        title='Stop'
        onPress={ this.pressStop }
      />
      <Text>Eighth Note Volume: { this.state.eighthNoteVolume }</Text>
      <Slider
        style={ styles.slider }
        minimumValue={ 0 }
        maximumValue={ 100 }
        step={ 1 }
        value={ this.state.eighthNoteVolume }
        onValueChange={ (value) => this.onEighthNoteVolumeChange(value) }
      />
    </View>
  );
}
