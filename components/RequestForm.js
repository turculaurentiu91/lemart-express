import React from 'react';
import { 
  KeyboardAvoidingView,
  View,
  Picker
} from 'react-native';
import Input from './Input';
import SubmitButton from './SubmitButton';
import StringFormatValidation from 'string-format-validation';
import ImageSelector from './ImageSelector';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class RequestForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        model: '',
        weight: '1/50',
        person: '',
        damage: '',
        images: [],
      },
      
      errors: []
    }
  }

  validationRules = {
    model: {
      min: 2,
    },
    weight: {
      min: 2,
    },
    person: {
      min: 2,
    },
    damage: {
      min: 2,
    },
  }

  haveError = error => this.state.errors.indexOf(error) !== -1;

  validateForm = () => {
    return Object.keys(this.state.formData).filter( key => {
      return !StringFormatValidation.validate(
        this.validationRules[key],
        this.state.formData[key],
      );
    });
  }

  submitForm = () => {
    const validationErrors = this.validateForm();
    if (validationErrors.length > 0) {
      this.setState({errors: validationErrors});
      return;
    }
    this.props.submitForm({
      ...this.state.formData,
      images: this.state.formData.images.map(img => img.base64),
    });
  }

  selectImage = img => {
    this.setState({
      formData: {
        ...this.state.formData, 
        images: [ 
          ...this.state.formData.images, 
          img,
        ]
      }
    });
  }

  removeImage = (indexToRemove) => {
    this.setState({
      formData: {
        ...this.state.formData,
        images: this.state.formData.images.filter((img, index) => index !== indexToRemove),
      }
    })
  }

  render() {

    return(
      <KeyboardAvoidingView
        behavior = 'padding'
        keyboardVerticalOffset = { 200 }
        enabled
        style = {{ marginTop: wp('15%'), width: '80%' }}
      >

        <ImageSelector 
          images={ this.state.formData.images } 
          selectImage={ this.selectImage }
          removeImage={ this.removeImage }
        />

        <Input
          value = { this.state.formData.model }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, model: value } }) }
          placeholder = "Marca modello e tipo"
          haveError = { this.haveError('model') }
          placeholderTextColor = "#333"
        />


        <View style={{
          fontSize: 15,
          borderStyle: 'solid',
          borderColor: '#333',
          borderWidth: 2,
          marginBottom: hp('2%'),
          //padding: wp('2%'),
          paddingLeft: wp('3%'),
        }}>
          <Picker
            selectedValue={this.state.formData.weight}
            onValueChange={val => this.setState({ formData: { ...this.state.formData, weight: val } }) }
          >
            <Picker.Item label="Peso: Meno di 50kg" value="1/50" />
            <Picker.Item label="Peso: Tra 51kg e 100kg" value="51/100" />
            <Picker.Item label="Peso: Piu di 100kg" value=">100" />
          </Picker>
        </View>


        <Input
          value = { this.state.formData.person }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, person: value } }) }
          placeholder = "Persona di riferimento"
          haveError = { this.haveError('person') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.damage }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, damage: value } }) }
          placeholder = "Guasto dichiarato"
          haveError = { this.haveError('damage') }
          placeholderTextColor = "#333"
          multiline = { true }
          numberOfLines = { 5 }
          style = {{
            
            textAlignVertical: "top"
          }}
        />

        <SubmitButton
          onPress = { this.submitForm }
        >
          INVIA RICHIESTA
        </SubmitButton>  
      </KeyboardAvoidingView>
    );
  }

}