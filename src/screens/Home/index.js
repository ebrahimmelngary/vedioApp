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

  const uploadVideo = async (video, thumbnail) => {
    const {path} = video;
    const file_name = path.split('/').slice(-1)[0];
    const file_name_thumbnail = thumbnail?.path.split('/').slice(-1)[0];

    const uploadVideoUri =
      Platform.OS === 'ios' ? path.replace('file://', '') : path;

    const uploadThumbnailUri =
      Platform.OS === 'ios'
        ? thumbnail?.path.replace('file://', '')
        : thumbnail?.path;

    setUploading(true);

    const taskRef = storage().ref(`/videos/${file_name}`);
    const taskThumbnailRef = storage().ref(`/videos/${file_name_thumbnail}`);
    let obj = {};

    try {
      await taskThumbnailRef.putFile(uploadThumbnailUri).then(async res => {
        if (res) {
          const imageUrl = await storage()
            .ref(`/videos/${file_name_thumbnail}`)
            .getDownloadURL();
          obj.imageUrl = imageUrl;
        }
      });
      await taskRef.putFile(uploadVideoUri).then(async res => {
        if (res) {
          const vedioUrl = await storage()
            .ref(`/videos/${file_name}`)
            .getDownloadURL();
          obj.vedioUrl = vedioUrl;
        }
      });

      if (obj.vedioUrl && obj.imageUrl) {
        await firestore()
          .collection('videos')
          .add(obj)
          .then(() => {
            console.log('User added!');
          });
        fetchVideos();
      }
    } catch (e) {
      console.log('upload error', e);
      setUploading(false);
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
