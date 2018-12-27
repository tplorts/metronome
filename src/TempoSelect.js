import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class TempoSelect extends PureComponent {
    sliderChange(value) {
        this.setState({value});
        this.props.handleTempoSlider(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 150 }}
                step={1} 
                value={this.props.tempoVal}
                onValueChange={(value) => {this.sliderChange(value)}}
                maximumValue={240}
                minimumValue={30}
            />
            <Text>Tempo - {this.props.tempoVal} bpm</Text>
        </View>
    );
}