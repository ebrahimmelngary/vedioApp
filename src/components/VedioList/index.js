import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../common/Images';
import styles from './styles';
import storage from '@react-native-firebase/storage';
import Video from 'react-native-video';

const VedioList = () => {
  const [data, setData] = useState();

  console.log('data', data);
  useEffect(() => {
    storage()
      .ref('videos')
      .listAll()
      .then(function (result) {
        result.items.forEach(function (imageRef) {
          imageRef
            .getDownloadURL()
            .then(function (url) {
              data.push(url);
              setData(data);
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      })
      .catch(e => console.log('Errors while downloading => ', e));
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => {
        console.log('item', item[0]);
        return (
          <TouchableOpacity style={styles.card}>
            <Video
              source={{
                uri: item.url,
              }}
            />
            <Image source={IMAGES.play} style={styles.playImage} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => item + index.toString()}
    />
  );
};

export default VedioList;
