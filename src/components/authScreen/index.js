    import React, { Component } from 'react';
    import { View,StyleSheet,Button,ImageBackground,Image,Animated,Easing} from 'react-native';
    import AsyncStorage from '@react-native-community/async-storage';
    import FacebookAuth from './facebookAuth';
    import GoogleAuth from './googleAuth';
    import LoadTabs from '../Tab';
    import BackgroundImage from '../../assets/background/DeepBlue.png'

  

class AuthScreen extends Component {
    _isMounted = false;
      constructor(props){
        super(props);
     this.animatedValue = new Animated.Value(0)
      }

      componentDidMount() {
        this.animLogo()                      // Starts the animation
      }

      animLogo(){
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
          }
        ).start(() => this.animLogo())
      }
      
     componentWillMount(){
       AsyncStorage.multiGet(['gojob@token','gojob@uid']).then((data)=>{
         let token = data[0][1];
         let uid = data[1][1];
         if (token && uid !== null) {
            console.log('data recieved');
             LoadTabs();
        } else {
           console.log('no data')
        }
      })
    }

    render() {
        const movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 200, 0]
      })
     
            return (
              <ImageBackground
                 source={BackgroundImage}
                 style = {styles.backgroundImage}
                >
                 <Animated.View
                    // style={{alignItems:'center',marginTop:50,opacity:animLogo}}
                      //  style = {this.state.animLogo.getLayout()}
                      style={{
                       marginLeft: movingMargin,
                       marginTop: movingMargin,
                           }}
                  >
                    <Image 
                      source = {require('../../assets/appLogo.png')}
                      style={{width:200,height:200}}
                    />
                 </Animated.View>  
               <View style={styles.container}>
                
                 <View>
                     <FacebookAuth  />
                  </View>
                  <View style={{marginTop:10}}>
                     <GoogleAuth />
                  </View>
               
                </View>
              </ImageBackground>  
            );
       }
    };

 const styles = StyleSheet.create({
     container :{
         flex: 1,
        alignContent:'center',
        justifyContent:'center',
        alignItems: 'center',
     },
     backgroundImage:{
      flex: 1,
      resizeMode: 'cover',
      
     }
 })   
export default AuthScreen;