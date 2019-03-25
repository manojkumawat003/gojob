import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
       }

    componentWillMount(){
      this.getData()
    }    

    navigateToAuthScreen = () => {
        Navigation.setRoot({
            root: {
              component: {
                name: 'gojob.AuthScreen'
              }
            }
          });
     this.skipWelcomeScreen()  
      
    }

    skipWelcomeScreen = async() =>{
      try {
        await AsyncStorage.setItem('gojob@welcomeScreen','notFirstTimeUser');
      } catch (error) {
          console.log(error)
      }
    }

    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('gojob@welcomeScreen')
        if(value !== null) {
          Navigation.setRoot({
            root: {
              component: {
                name: 'gojob.AuthScreen'
              }
            }
          });
        }
      } catch(e) {
        console.log(e)
      }
    }

    render() {
        return (
            <ScrollView
            horizontal
            style = {{flex:1}}
            pagingEnabled
        >   
            <View style={styles.container}>
                 <Text style={styles.text}>Find job near your location</Text>
                 <Text style={styles.text}>Swipe left to skip job</Text>
               <View>
                  <Text style={styles.text}>Swipe right to save job</Text>
                  <TouchableOpacity
                     onPress= {()=>this.navigateToAuthScreen()}
                     componentId='go'
                   >
                       <Text style={{textAlign:'center',marginTop: 90,color:'white',textDecorationLine:'underline'}}>Get Started</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </ScrollView> 
        )
    }
} 

const styles = StyleSheet.create({
    container :{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        alignContent: 'center',
        backgroundColor:'#33b5ff'
    },
    text :{
        fontSize:30,
        width:SCREEN_WIDTH,
        color:'white',
        textAlign: 'center',
              
    }
})



export default WelcomeScreen;