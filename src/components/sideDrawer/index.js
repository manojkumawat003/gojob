import React, {Component} from 'react';
import {StyleSheet,View,Text,Dimensions,Image,ImageBackground} from 'react-native';
import firebase from 'react-native-firebase';
import BackgroundImage from '../../assets/background/NightSky.png'

const SCREEN_WIDTH = Dimensions.get('window').width

class SideDrawer extends Component {
        constructor(props){
            super(props);
           this.state={
               userInfo:''
           }
        }

    componentWillMount(){
        console.log( firebase.auth().currentUser._user);
       this.state.userInfo = firebase.auth().currentUser._user; 
      } 
  
    render() {
        return (
           <View style= {styles.container}>
             <ImageBackground
               source={BackgroundImage}
               style={{flex:1,resizeMode:'cover'}}
             >
              <View style={{marginTop:20,alignItems:'center',padding: 10,}}>
                    <Image 
                      source={{uri:`${this.state.userInfo.photoURL}`}}
                      style={{width: 150, height: 150,borderRadius:100}}
                    />
                    <Text style={{fontSize:20,color:'white',marginTop:5}}>{this.state.userInfo.displayName}</Text>
                    <Text style={{fontStyle:'italic',color:'white'}}>{this.state.userInfo.email}</Text>
               </View>
            </ImageBackground>
           
           </View>
        )
    }
} 

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:'white'
    }
})



export default SideDrawer;