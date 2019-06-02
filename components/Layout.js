import React from 'react';
import { 
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import Header from './Header';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function(props) {
  return(
    <ImageBackground
      source={require('../assets/turbine.png')}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <ScrollView>
        <Header userData = { props.userData } />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp('-10%'),
            width: '100%',
          }}
        >
          { props.children }
        </View>
      </ScrollView>
    </ImageBackground>
  );
}