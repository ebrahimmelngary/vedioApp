import React, {useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import LottieView from 'lottie-react-native';

import Modal from 'react-native-modal';
import styles from './styles';
import AppButton from '../AppButton';
import VideoPlayer from '../VideoPlayer';

const PlayerModal = ({isVisible, vedioUri, togleModal}) => {
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <AppButton
        title={'Close'}
        titleStyle={styles.closeText}
        style={styles.closeButton}
        onPress={togleModal}
      />

      <View style={styles.video}>
        <VideoPlayer videoUrl={vedioUri} />
      </View>
    </Modal>
  );
};

export default PlayerModal;
