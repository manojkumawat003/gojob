import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import LoadTabs from '../Tab';


export default class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      userToken:'',
      UID:''
    };
  }
  componentDidMount() {
  GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //Enter your webClientId here//
      webClientId:
        '794855193686-6m0hqadvelsp82sa08mnc1urs7146rov.apps.googleusercontent.com',
    })
      
  }
  _signIn = async () => {
   
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(['Error is',error]);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
      console.log('signOut');
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  // _hasPlayServices = async ()=> {
  //   try {
  //       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //       // google services are available
  //     } catch (err) {
  //       console.error('play services are not available');
  //       alert(error)
  //     }
  // }

  googleLogin = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();
  
      const data = await GoogleSignin.signIn();
        console.log(['userData',data])
     
      // create a new firebase credential with the token
      const credential =  firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential)
      
          this.setState({UID:firebaseUserCredential.user.uid, userToken:data.accessToken},
            () => {this.storeTokenToPhone().then(()=>LoadTabs())}             
              )  
     // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
     // console.log(['uid',this.state.UID])
     // console.log(['userToken',this.state.userToken])
    }catch (e) {
      console.error(e);
    }
  }
  
    storeTokenToPhone = async() =>{
      try {
        await AsyncStorage.multiSet([
          ['gojob@token',this.state.userToken],
          ['gojob@uid',this.state.UID]
        ]);
      } catch (error) {
          console.log(error)
      }
    }

    
  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 312, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={()=>this.googleLogin()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
   //  backgroundColor: '#fff',
    
      },
});