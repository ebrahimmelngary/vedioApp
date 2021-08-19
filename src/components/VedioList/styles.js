import {StyleSheet} from 'react-native';
import { COLORS } from '../../common/Colors';

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
    width: 75,
    height: 75,
    zIndex: 100,
  },
  imageBackground: {
    width: '100%',
    padding:5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyScreen:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    marginTop:"20%"
  },
  emptyImage:{width:250,height:250},
  text:{
    fontSize: 12,
    color:COLORS.grayText,
    paddingHorizontal:'15%',
    textAlign:'center'
  }
});

export default styles;
