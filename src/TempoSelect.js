import React, { PureComponent } from 'react';
import { View, Slider } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './TempoSelect.style';

export default class TempoSelect extends PureComponent {
    state = {
        value: 120
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Slider
                style={{ width: 200 }}
                step={1} 
                value={this.state.value}
                onValueChange={(value) => this.setState({value})}
                maximumValue={300}
                minimumValue={30}
            />
            <Text>Value: {this.state.value}</Text>
        </View>
    );
}