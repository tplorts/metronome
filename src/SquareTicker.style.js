import { StyleSheet } from 'react-native';


const size = 100;

export default StyleSheet.create({
  square: {
    backgroundColor: 'grey',
    height: size,
    width: size,
  },
  squareFilled: {
    backgroundColor: 'black',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
