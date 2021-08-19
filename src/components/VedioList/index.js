import React, {useState} from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
} from 'react-native';
import styles from './styles';
import LottieView from 'lottie-react-native';
import {ANMATIONS} from '../../common/Anmations';
import PlayerModal from '../PlayerModal';

const VedioList = ({data}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [playVideo, setPlayVideo] = useState('');

  if (!data) {
    return <ActivityIndicator color={'green'} size={'large'} />;
  }

  const handelPress = item => {
    setIsVisible(!isVisible);
    setPlayVideo(item?.vedioUrl);
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handelPress(item)}>
              <ImageBackground
                resizeMode={'cover'}
                source={{uri: item.imageUrl}}
                style={styles.imageBackground}>
                <View>
                  <LottieView
                    source={ANMATIONS.play}
                    autoPlay
                    loop
                    style={styles.playImage}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyScreen}>
            <View>
              <LottieView
                source={ANMATIONS.noViedo}
                autoPlay
                autoSize
                style={styles.emptyImage}
              />
            </View>
            <Text style={styles.text}>
              Please press select or capture to add your video
            </Text>
          </View>
        }
        keyExtractor={(item, index) => item + index.toString()}
      />
      <PlayerModal
        isVisible={isVisible}
        vedioUri={playVideo}
        togleModal={() => setIsVisible(!isVisible)}
      />
    </>
  );
};

export default React.memo(VedioList);
