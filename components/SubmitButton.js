import React from 'react';
import { 
  TouchableOpacity,
  Text
} from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function(props) {
  return(
    <TouchableOpacity
      onPress = { props.onPress }
      style = {{
        backgroundColor: 'rgba(52, 193, 113, .8)',
        padding: wp('5%'),
        borderRadius: wp('5%'),
        marginTop: hp('3%'),
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: wp('8%'),
          fontWeight: 'bold',
          fontFamily: 'Calibri Bold',
          color: '#dadada',
        }}
      >
        { props.children }
      </Text>
    </TouchableOpacity>
  );
}