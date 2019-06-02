import React from 'react';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default () => {
  return(
    <View style={{
      marginTop: hp('4%'),
      marginLeft: wp('5%'),
      width: '45%',
    }}>
      <Text style={{
        fontSize: wp('12%'),
        fontWeight: 'bold',
        color: '#34c171',
        fontFamily: 'Calibri Bold'
      }}>
        express
      </Text>
      <Text 
        style={{
          textAlign: 'right',
          fontStyle: 'italic',
          marginRight: wp('5%'),
          color: '#2f81bc',
          marginTop: hp('-1%'),
          fontFamily: 'Times New Roman'
        }}
      >
        by LEMART
      </Text>
    </View>
  );
}