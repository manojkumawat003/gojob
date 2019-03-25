import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken,LoginManager  } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import LoadTabs from '../Tab';
import {  Button, Icon,Text } from 'native-base';

class FacebookAuth extends Component {

      constructor(props){
        super(props);
        this.state = {
          userInfo:'',
          userToken:'',
          UID:''
        }
      }

   facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
  
      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request'); 
      }
  
     // console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
         
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token');
      }
  
      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
     // console.log(['userData',firebaseUserCredential.user])
    //     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
    this.setState({UID:firebaseUserCredential.user.uid, userToken:data.accessToken},
      () => {this.storeTokenToPhone().then(()=>LoadTabs())}             
        )  
// console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    console.log(['uid',this.state.UID])
    console.log(['userToken',this.state.userToken])

    } catch (e) {
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
      
      <View>
      
         <Button iconLeft 
           onPress = {()=> this.facebookLogin()}
           accessibilityLabel="Sign In with your facebook account."
         >
            <Icon type="FontAwesome" name='facebook' style={{fontSize: 40, }}/>
            <Text>continue with facebook</Text>
          </Button>

      </View>

           

    );
  }
};
export default FacebookAuth;
