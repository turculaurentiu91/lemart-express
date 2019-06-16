import React from 'react';
import { 
  KeyboardAvoidingView,
  View,
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
        weight: '',
        total: '',
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
      type: 'numeric',
      min: 1,
    },
    total: {
      type: 'numeric',
      min: 1,
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
          placeholder = "Marca, modello e tipo"
          haveError = { this.haveError('model') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.weight }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, weight: value } }) }
          placeholder = "Peso kg"
          haveError = { this.haveError('weight') }
          placeholderTextColor = "#333"
          keyboardType = 'numeric'
        />

        <Input
          value = { this.state.formData.total }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, total: value } }) }
          placeholder = "Numero pianali totale"
          keyboardType = 'numeric'
          haveError = { this.haveError('total') }
          placeholderTextColor = "#333"
        />

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