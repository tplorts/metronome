import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './MeterSelect.style';

export default class BeatDisplay extends PureComponent {
    render = () => (
        <View style={ styles.wrapper }>
            <Text style={{fontSize: 50}}>{this.props.playing ? (this.props.playingIndex+1) : 'Off'}</Text>
        </View>
    );
}