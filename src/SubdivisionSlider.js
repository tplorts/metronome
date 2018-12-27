import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class SubdivisionSlider extends PureComponent {
    state = {
        value: this.props.subdivisionVolume
    }

    sliderChange(value) {
        this.setState({value});
        this.props.handleSubdivisionSlider(value);
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
            <Text>Subdivision Volume => {this.state.value}</Text>
        </View>
    );
}