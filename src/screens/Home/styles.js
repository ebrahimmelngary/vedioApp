import {StyleSheet} from 'react-native';
import {COLORS} from '../../common/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    height: 75,
  },
  uploading: {
    height: 65,
    alignSelf: 'center',
    marginTop:5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 10,
  },
  uploadingContainer: {
    flex: 1,
  },
});
