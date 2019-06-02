import React from 'react';
import {View, Text} from 'react-native';
import { 
  SecureStore,
  Asset,
  Font,
  AppLoading,
  SplashScreen,
 } from 'expo';
import Layout from './components/Layout';
import RegisterForm from './components/RegisterForm';
import RequestForm from './components/RequestForm';
import { Feather } from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      userData: null,
    };
  }

  componentDidMount() {
    SplashScreen.preventAutoHide();
    //SecureStore.deleteItemAsync('user-data')
  }
  
  isUserRegistered = () => typeof this.state.userData !== 'undefined';
  
  onFinishLoading = async () => {
    const newState = {
      isReady: true,
    }

    const userData = await SecureStore.getItemAsync('user-data');
    if (userData !== null) {
      newState.userData = JSON.parse(userData);
    }
    
    SplashScreen.hide();
    this.setState(newState);
  }

  setUserData = userData => {
    SecureStore.setItemAsync('user-data', JSON.stringify(userData));
    this.setState({userData});
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
      return(
        <Layout userData = { this.state.userData }>
          {
            this.state.userData 
            ? <RequestForm />
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