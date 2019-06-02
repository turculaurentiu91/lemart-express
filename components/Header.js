import React from 'react';
import { View, Text } from 'react-native';
import Logo from './Logo';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default (props) => {
  return (
    <View
      style = {{
        flexDirection: 'row',
      }}
    >
      <Logo />
      { props.userData &&
        <View style={{ 
          marginTop: hp('6%'),
          marginBottom: hp('13%'),
        }}>
          <Text> { props.userData.companyName } </Text>
          <Text> { props.userData.email } </Text>
        </View>
      }
    </View>
  );
}