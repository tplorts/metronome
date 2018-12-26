import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class MeterSelect extends PureComponent {
    state = {
        value: this.props.meterVal
    }

    sliderChange(value) {
        this.setState({value});
        this.props.handleMeterSlider(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 150 }}
                step={1} 
                value={this.state.value}
                onValueChange={(value) => {this.sliderChange(value)}}
                maximumValue={9}
                minimumValue={1}
            />
            <Text>Meter - {this.state.value}/4</Text>
        </View>
    );
}