import React from 'react';
import { ImageBackground } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default function ImageTile (props) {

  return React.createElement(
    ImageBackground,
    {
      ...props,
      style: [
        {
          borderRadius: wp('3%'),
          borderStyle: 'solid',
          borderWidth: wp('1.3%'),
          borderColor: '#333',
          width: wp('20%'),
          height: wp('20%'),
          justifyContent: "center",
          alignItems: "center",
        },
      ]
    },
    props.children
  );
}