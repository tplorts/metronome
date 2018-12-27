import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class QuarterVolume extends PureComponent {
    state = {
        value: this.props.quarterVolume
    }

    sliderChange(value) {
        this.setState({value});
        this.props.handleQuarterVolume(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 150 }}
                step={1} 
                value={this.state.value}
                onValueChange={(value) => {this.sliderChange(value)}}
                maximumValue={10}
                minimumValue={0}
            />
            <Text>Quarter Note Pulse Volume => {this.state.value}</Text>
        </View>
    );
}