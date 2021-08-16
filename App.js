/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState} from 'react';
import {Alert, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS} from './src/common/Colors';
import AppButton from './src/components/AppButton';
import VedioList from './src/components/VedioList';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

const App = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const tooglePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log('video?.sourceURL', video);
      // "/data/user/0/com.vedioapp/cache/react-native-image-crop-picker/SVID_20210804_035706_1.mp4"
      setImage(video);
      // if (video?.path) {
      uploadImage(video);
      // }
    });
  };

  const toogleCamira = async () => {
    await ImagePicker.openCamera({
      mediaType: 'video',
    }).then(video => {
      setImage(video);
      console.log('vqwertyuiop[]', video?.sourceURL);
      // if (video?.path) {
      uploadImage();
      // }
    });
  };

  const uploadImage = async video => {
    const {path} = video;
    const file_name = path.split('/').slice(-1)[0];
    const uploadUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    setUploading(true);
    setTransferred(0);

    const taskRef = storage().ref(`/videos/${file_name}`);



    try {
      await taskRef.putFile(uploadUri);
    } catch (e) {
      console.log('upload error', e);
    }

    setUploading(false);

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );

    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppButton
          title={'Select'}
          onPress={tooglePicker}
          loading={uploading}
        />
        <AppButton
          title={'Capture'}
          onPress={toogleCamira}
          loading={uploading}
        />
      </View>
      {transferred ? <Progress.Bar progress={transferred} width={300} /> : null}
      <VedioList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    marginBottom: 10,
  },
});

export default React.memo(App);
