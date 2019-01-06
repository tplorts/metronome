import React, { PureComponent } from 'react';
import {
  Button, Text, Slider, View, NativeModules,
} from 'react-native';
import styles from './App.style';

export default class App extends PureComponent {
  state = {
    tempo: 120,
    meter: 4,
    quarterAccentMIDINote: 96,
    quarterMIDINote: 88,
  };

  componentWillMount() {
    // NativeModules.Metronome.prepareToPlay()
  }


  pressPlay() {
    // NativeModules.Metronome.pressPlay()
  }

  pressStop() {
    // NativeModules.Metronome.pressStop()
  }

  onTempoChange(value) {
    console.log('tempo is: ' + value);
    this.setState({ tempo: value })
    // NativeModules.Metronome.onTempoChange(value)
  }

  onMeterChange(value) {
    this.setState({ meter: value }, () => {
      console.log(`meter: ${this.state.meter}/4`)
      // NativeModules.Metronome.onMeterChange(value)
    });
  }

  render = () => (
    <View style={ styles.container }>
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
    </View>
  );
}
