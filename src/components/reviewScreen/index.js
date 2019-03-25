import React, {Component} from 'react';
import {StyleSheet,View,Text,Dimensions,ImageBackground} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ShowSavedCards from './ShowSavedCards';
import BackgroundImage from '../../assets/background/UnderWater.jpg';

class ReviewScreen extends Component {
      constructor(props){
      super(props);
      Navigation.events().bindComponent(this); 
    }

    static options(passProps) {
        return {
          topBar: {
            visible: true,
            animate: false, // Controls whether TopBar visibility changes should be animated
            hideOnScroll: false,
            buttonColor: 'black',
            drawBehind: false,
            testID: 'reviewTopBar',
            title: {
              text: 'Review',
              fontSize: 20,
              color: 'white',
              fontFamily: 'Helvetica',
              alignment: 'center'
            },
            background: {
                color: '#0B7EF1',
                 },
                 rightButtons: [
                  // {
                  //   id: 'refreshButton',
                  //   icon: require('../../assets/refresh.png')
                  // }
                ],      
           },
           bottomTabs: {
               titleDisplayMode: 'showWhenActive', // Sets the title state for each tab.
               backgroundColor: '#0B7EF1',
          },
          bottomTab: {
            text: 'Review',
        //    selectedIconColor: 'blue',
            selectedTextColor: 'white',
            fontFamily: 'Helvetica',
            },
        
          overlay: {
            interceptTouchOutside: true
          },
        
                 
        };
      }

      navigationButtonPressed({ buttonId }) {
        if(buttonId === "refreshButton"){
          console.log('clicked')
        }
      }

    
    render() {
        return (
          <ImageBackground
           source = {BackgroundImage}
           style = {{flex:1,resizeMode:'cover'}}
          >
            <View style={styles.container}>
                <ShowSavedCards  />
            </View>
          </ImageBackground>  
        )
    }
} 

const styles = StyleSheet.create({
  container:
  {
      flex: 1,
  },
})


export default ReviewScreen;

