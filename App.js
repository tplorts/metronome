import React, { PureComponent } from 'react';
import {
  Button, Text, Slider, View, NativeModules,
} from 'react-native';
import styles from './src/App.style';

console.log(NativeModules.Metronome);

export default class App extends PureComponent {
  state = {
    tempo: 120,
    meter: 4,
  };

  componentWillMount() {
    NativeModules.Metronome.prepareToPlay();
  }


  pressPlay = () => {
    NativeModules.Metronome.pressPlay();
  };

  pressStop = () => {
    NativeModules.Metronome.pressStop();
  };

  // ?? Should NM.M.onTempoChange() be inside the callback of setState()?
  onTempoChange(value) {
    this.setState({ tempo: value }, () => {
      console.log(`tempo: ${value}`);
      // NativeModules.Metronome.onTempoChange(value);
    });
  }

  onMeterChange(value) {
    this.setState({ meter: value }, () => {
      console.log(`meter: ${this.state.meter}/4`);
      // NativeModules.Metronome.onMeterChange(value);
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
    </View>
  );
}
