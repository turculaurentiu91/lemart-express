import React from 'react';
import { TextInput } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function(props) {

  const inputStyle = {
    fontSize: 15,
    borderStyle: 'solid',
    borderColor: '#333',
    borderWidth: 2,
    marginBottom: hp('2%'),
    padding: wp('2%'),
    paddingLeft: wp('3%'),
  }

  const errorInputStyle = {
    borderColor: '#ff0000',
  }

  return React.createElement(
    TextInput, 
    {
      ...props,
      style: [inputStyle, props.haveError && errorInputStyle, props.style],
    }
  );
}