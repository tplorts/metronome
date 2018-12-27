import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class SubdivisionSlider extends PureComponent {
    sliderChange(value) {
        this.setState({value});
        this.props.handleSubdivisionSlider(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 150 }}
                step={1} 
                value={this.props.subdivisionVolume}
                onValueChange={(value) => {this.sliderChange(value)}}
                maximumValue={10}
                minimumValue={0}
            />
            <Text>Subdivision Volume => {this.props.subdivisionVolume}</Text>
        </View>
    );
}