import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
const OverlayLoader = (props) => {
  const {isLoading, color, size, opacity} = props;
  return (
    <Spinner
      visible={isLoading}
      overlayColor={
        opacity ? `rgba(0, 0, 0, ${opacity})` : 'rgba(0, 0, 0, 0.25)'
      }
      customIndicator={
        <View style={{...styles.container}}>
          <ActivityIndicator size={size} color={'#CC2D3A'} />
          <Text style={{...styles.message}}>Loading, please wait.</Text>
        </View>
      }
    />
  );
};

export default OverlayLoader;
