import React from 'react';
import {ToastAndroid, Platform, View, Text, AsyncStorage} from 'react-native';
import { AppLoading, SplashScreen, Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SecureStore from 'expo-secure-store';
import Layout from './components/Layout';
import RegisterForm from './components/RegisterForm';
import RequestForm from './components/RequestForm';
import { Feather } from '@expo/vector-icons';
import SubmitButton from './components/SubmitButton';

import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const HOST = 'https://app.lemart.it';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      userData: null,
      submitted: false,
    };
  }

  registerExponentPushToken = async () => {
    const PUSH_ENDPOINT = `${HOST}/api/exponent-push-token`;

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      throw new Error("Permission not granted");
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token
      }),
    });
  }

  componentDidMount() {
    SplashScreen.preventAutoHide();
    //SecureStore.deleteItemAsync('user-data')

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('notifiche-publicitare', {
        name: 'Notifiche Publicitare',
        sound: true,
      });
    }

    this.registerExponentPushToken()
    .catch(error => {
      if ( error.message == "Permission not granted" ) {
        return;
      }
    });
  }
  
  isUserRegistered = () => typeof this.state.userData !== 'undefined';
  
  onFinishLoading = async () => {
    const newState = {
      isReady: true,
    }

    const userData = await AsyncStorage.getItem('user-data');
    if (userData !== null) {
      newState.userData = JSON.parse(userData);
    }
    
    SplashScreen.hide();
    this.setState(newState);
  }

  setUserData = userData => {
    AsyncStorage.setItem('user-data', JSON.stringify(userData))
    .then(() => this.setState({userData}));
  }

  submitRequest = request => {
    const finalRequest = {
      ...request,
      ...this.state.userData,
    };

    fetch(`${HOST}/api/express-request`, {
      method: 'POST',
      body: JSON.stringify(finalRequest),
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      }
    })
    .then(res => {
      this.setState({submitted: true});

      setTimeout(() => this.setState({submitted: false}), 2000);
    })
    .catch(e => {
      ToastAndroid.showWithGravity(
        'Si è verificato un errore sul nostro server, riprova più tardi.', 
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      console.log(e);
    });
  }

  async _cacheResourcesAsync() {
    const images = [
      require('./assets/turbine.png'),
    ];

    const fontPromises = Font.loadAsync({
      ...Feather.font,
      'Calibri Bold': require('./assets/calibri_bold.ttf'),
      'Times New Roman': require('./assets/times_new_roman.ttf'),
    });

    const cacheImages = images.map(asset => Asset.fromModule(asset).downloadAsync());
    const cacheAssets = [
      ...cacheImages,
      fontPromises,
    ];

    return Promise.all(cacheAssets);
  }

  render() {
    if (this.state.isReady) {

      const textStyle = {
        fontSize: wp('4%'),
        margin: wp('2%'),
        fontWeight: 'bold',
      };

      return(
        <Layout userData = { this.state.userData }>
          { 
            this.state.submitted 
            ? <View style={{
              marginTop: hp('25%'),
              padding: hp('2%'),
            }}>
                <View style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, .6)',
                  borderRadius: wp('5%'),
                  marginBottom: hp('5%'),
                  padding: hp('2%'),
                }}>
                  <Text style={textStyle}>GRAZIE,</Text>          
                  <Text style={[textStyle]}> INIZIA AD USARE DA SUBITO L'APP</Text>
                </View>
                <SubmitButton onPress={() => this.setState({submitted: false})}>
                  TORNA INDIETRO
                </SubmitButton>
              </View>
            : this.state.userData 
              ? <RequestForm submitForm = { this.submitRequest }/>
              : <RegisterForm setUserData = { this.setUserData } />
          }
        </Layout>
      );
    }

    return(
      <AppLoading
        startAsync={ this._cacheResourcesAsync }
        onFinish={ this.onFinishLoading }
        onError={ console.warn }
      />
    );
  }
}