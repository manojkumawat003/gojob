import React, {Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import MapViewHome from './mapView';

class HomeScreen extends Component {
    static options(passProps) {
        return {
          topBar: {
            visible: true,
            animate: true, // Controls whether TopBar visibility changes should be animated
            hideOnScroll: true,
            buttonColor: 'black',
            drawBehind: false,
            testID: 'homeTopBar',
            title: {
              text: 'Home',
              fontSize: 20,
              color: 'white',
              fontFamily: 'Helvetica',
            //   component: {
            //    name: 'gojob.HomeScreen',
            //     alignment: 'center'
            //   }
              alignment: 'center'
            },
            background: {
                color: '#0B7EF1',
                // component: {
                //   name: 'gojob.HomeScreen'
                // }
              },
              // leftButtons: [
              //   {
              //     id: 'drawerButton',
              //     icon: require('../../assets/drawer.png'),
                         
              //   }
              // ],
      
           },
           bottomTabs: {
               titleDisplayMode: 'showWhenActive' , // Sets the title state for each tab.
               animate: true,
               backgroundColor: '#0B7EF1',
               visible: true
          },
          bottomTab: {
            text: 'Home',
        //    selectedIconColor: 'black',
            selectedTextColor: 'white',
            fontFamily: 'Helvetica',
          
             },
                    
          overlay: {
            interceptTouchOutside: true
          },
        
                 
        };
      }
    
    render() {
         
        return (
           <View>
                <MapViewHome/>
           </View>
        )
    }
} 

const styles = StyleSheet.create({
    
})



export default HomeScreen;