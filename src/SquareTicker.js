import React, { PureComponent } from 'react';
import { View } from 'react-native';
import styles from './SquareTicker.style';


export default class SquareTicker extends PureComponent {
  state = {
    tick: true,
  };

  intervalId = null;

  start() {
    this.intervalId = setInterval(this.tick, ((60/this.props.tempoVal)*1000));
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  tick = () => this.setState(prior => ({
    tick: !prior.tick,
  }));

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.playing !== nextProps.playing) {
      if (nextProps.playing) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  render = () => (
    <View style={ styles.wrapper }>
      <Square filled={ this.state.tick } />
      <Square filled={ !this.state.tick } />
    </View>
  );
}

const Square = ({ filled }) => <View style={ [styles.square, filled && styles.squareFilled] } />;
