import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './MeterSelect.style';

export default class MeterSelect extends PureComponent {
    sliderChange(value) {
        this.setState({value});
        this.props.handleMeterSlider(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 150 }}
                step={1} 
                value={this.props.meterVal}
                onValueChange={(value) => {this.sliderChange(value)}}
                maximumValue={9}
                minimumValue={1}
            />
            <Text>Meter - {this.props.meterVal}/4</Text>
        </View>
    );
}