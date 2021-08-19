import React, {useEffect} from 'react';
import {useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {createThumbnail} from 'react-native-create-thumbnail';
import LottieView from 'lottie-react-native';
import {ANMATIONS} from '../../common/Anmations';
import VedioList from '../../components/VedioList';
import AppButton from '../../components/AppButton';
import styles from './styles';

const Home = () => {
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    await firestore()
      .collection('videos')
      .get()
      .then(querySnapshot => {
        let getData = [];
        querySnapshot.forEach(doc => {
          getData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return setData(getData);
      });
  };

  const tooglePicker = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        createThumbnail({
          url: video.path,
          timeStamp: 10000,
        }).then(response => {
          uploadVideo(video, response);
        });
      })
      .catch(err => console.log({err}));
  };

  const toogleCamira = async () => {
    await ImagePicker.openCamera({
      mediaType: 'video',
    })
      .then(video => {
        createThumbnail({
          url: video.path,
          timeStamp: 10000,
        }).then(thumbnail => {
          uploadVideo(video, thumbnail);
        });
      })
      .catch(err => console.log({err}));
  };

  const uploadUrl = async (file_name, uploadUri) => {
    const taskRef = storage().ref(`/videos/${file_name}`);
    try {
      await taskRef.putFile(uploadUri).then(async res => {
        if (res) {
          await storage().ref(`/videos/${file_name}`).getDownloadURL();
          // obj.imageUrl = imageUrl;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadVideo = async (video, thumbnail) => {
    const videoPath = video.path;
    const thumbnailPath = thumbnail.path;

    const video_file_name = videoPath.split('/').slice(-1)[0];
    const thumbnailPath_file_name = thumbnailPath.split('/').slice(-1)[0];

    const uploadVideoUri =
      Platform.OS === 'ios'
        ? thumbnailPath.replace('file://', '')
        : thumbnailPath;

    const uploadThumbnailUri =
      Platform.OS === 'ios'
        ? thumbnailPath.replace('file://', '')
        : thumbnailPath;

    setUploading(true);

    const taskRef = storage().ref(`/videos/${thumbnailPath_file_name}`);
    let obj = {};

    uploadUri(video_file_name, uploadVideoUri);

    uploadUri(thumbnailPath_file_name, uploadThumbnailUri);

    if (obj.vedioUrl && obj.imageUrl) {
      await firestore()
        .collection('videos')
        .add(obj)
        .then(() => {
          console.log('User added!');
        });
      fetchVideos();
    }
    setUploading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {uploading ? (
          <View style={styles.uploadingContainer}>
            <LottieView
              source={ANMATIONS.uploading}
              autoPlay
              loop
              style={styles.uploading}
            />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <AppButton title={'Select'} onPress={tooglePicker} />
            <AppButton title={'Capture'} onPress={toogleCamira} />
          </View>
        )}
      </View>
      <VedioList data={data} />
    </SafeAreaView>
  );
};

export default React.memo(Home);
