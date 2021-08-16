import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 180,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  playImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 100,
  },
});

export default styles;
