import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import StringFormatValidation from 'string-format-validation';
import SubmitButton from './SubmitButton';
import Input from './Input';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class RegisterForm extends React.Component {

  state = {
    formData: {
      companyName: '',
      email: '',
      phone: '',
      address: '',
    },
    errors: [],
  }

  validationRules = {
    companyName: {
      min: 2,
    },
    email: {
      type: 'email',
    },
    phone: {
      type: 'phone',
    },
    address: {
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

    this.props.setUserData(this.state.formData);
  }

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <KeyboardAvoidingView
        enabled
        behavior = 'padding'
        keyboardVerticalOffset = { 20 } 
        style = {{
          padding: 30,
          marginTop: wp('25%')
        }}
      >
        <Text
          style={{
            fontSize: 15,
            marginBottom: 20,
          }}
        >
          Si prega di compilare il modulo per autorizzare la vostra applicazione.
        </Text>
        
        <Input
          value = { this.state.formData.companyName }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, companyName: value } }) }
          placeholder = "Nome dell'azienda"
          textContentType = "organizationName"
          haveError = { this.haveError('companyName') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.email }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, email: value } }) }
          placeholder = "E-mail"
          textContentType = "emailAddress"
          keyboardType = "email-address"
          haveError = { this.haveError('email') }
          placeholderTextColor = "#333"
        />
        
        <Input
          value = { this.state.formData.phone }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, phone: value } }) }
          placeholder = "Numero di cellulare"
          textContentType = "telephoneNumber"
          keyboardType = "phone-pad"
          haveError = { this.haveError('phone') }
          placeholderTextColor = "#333"
        />

        <Input
          value = { this.state.formData.address }
          onChangeText = { value => this.setState({ formData: { ...this.state.formData, address: value } }) }
          placeholder = "Indirizzo"
          textContentType = "fullStreetAddress"
          haveError = { this.haveError('address') }
          placeholderTextColor = "#333"
        />
        
        <SubmitButton
          onPress = { this.submitForm }
        >
          RICHIEDI ACCESSO
        </SubmitButton>

        {/* <Button
          title="Richiedi Accesso"
          color="#34c171"
          onPress={this.submitForm}
        /> */}
      </KeyboardAvoidingView>
    )
  }
}