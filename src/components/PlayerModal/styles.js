import { StyleSheet} from 'react-native';
import {COLORS} from '../../common/Colors'
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.black,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  video:{
     width: '100%',
},
  closeText:{
    color:COLORS.white
  },
  closeButton:{
    borderColor:COLORS.white,
    position:'absolute',
    top:20,
    right: 10,
  },
  playImage: {
    width: 75,
    height: 75,
    zIndex: 100,
  },
});

export default styles;
