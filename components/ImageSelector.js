import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ImageTile from './ImageTile';
import { Feather } from '@expo/vector-icons';
import { ImagePicker, Permissions, } from 'expo';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class ImageSelector extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    pendingRemovalConfirm: -1,
  }

  selectImage = async () => {
    let { status } = await Permissions.getAsync(
      Permissions.CAMERA, 
      Permissions.CAMERA_ROLL
    );

    if (status !== 'undetermined') {
      let res = await Permissions.askAsync(
        Permissions.CAMERA, 
        Permissions.CAMERA_ROLL
      );
    }

    const result = await ImagePicker.launchCameraAsync({
      //allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (result.cancelled) {
      return;
    }
    this.props.selectImage(result);
  }

  handleTouch = (index) => {
    if (this.state.pendingRemovalConfirm != index) {
      this.setState({pendingRemovalConfirm: index});
    } else {
      this.setState({pendingRemovalConfirm: -1});
      this.props.removeImage(index);
    }
  }

  render() {
    const imagesArray = this.props.images.length > 4 
      ? this.props.images.slice(0, 4)
      : this.props.images

    const imagesElements = imagesArray.map((img, index) => {
      return (
        <TouchableOpacity 
          key = {index} 
          onPress={() => this.handleTouch(index)} 
          style={{marginRight: wp('2%')}}
        >
          <ImageTile
            source = {{ uri: img.uri }}
          >
            { this.state.pendingRemovalConfirm == index &&  
              <Feather name="x" color="black" size={wp('11%')}/>
            }
          </ImageTile>
        </TouchableOpacity>
      );
    });

    return (
      <View
        style = {{
          //flex: 1,
          flexDirection: 'row',
          marginBottom: hp('3%'),
        }}
      >
        { imagesElements }
        { imagesArray.length < 4  && 
          <TouchableOpacity 
            style={{ 
              borderRadius: wp('3%'),
              borderStyle: 'solid',
              borderWidth: wp('1.3%'),
              borderColor: '#555',
              backgroundColor: '#ccc',
              width: wp('20%'),
              height: wp('20%'), 
              justifyContent: "center",
              alignItems: "center",
            }}
          onPress={ this.selectImage }
        >
          <Feather size={wp('11%')} name="camera" color="#555" />
        </TouchableOpacity>
        }
      </View>
    );
  }
}

ImageSelector.defaultProps = {
  images: [],
}