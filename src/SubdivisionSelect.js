import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './SubdivisionSelect.style';
import { ButtonGroup, Text } from 'react-native-elements';

export default class SubdivisionSelect extends PureComponent {
    buttonPress = (value) => {
        this.setState({value})
        this.props.handleSubdivisionSelect(value);
    }

    render = () => (
        <View style={ styles.wrapper }>
            <Text>Select Subdivison Value Below</Text>
            <ButtonGroup
                onPress={this.buttonPress}
                selectedIndex={this.props.subdivisionVal}
                buttons={['Quarter', 'Eighth', 'Triplet', 'Sixteenth']}
                containerStyle={{width: 350}}
                />
        </View>
    );
}