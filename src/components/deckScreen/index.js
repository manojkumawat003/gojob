import React, {Component} from 'react';
import {StyleSheet,View,Text,Button,ImageBackground,Image,Animated,Easing} from 'react-native';
import {getJobData} from '../../store/actions/job_data_action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import JobLocationMapDeck from './jobLocationMapDeck';
import BackgroundImage from '../../assets/background/MorpheusDen.png';
import SearchIcon from '../../assets/search.png';

class DeckScreen extends Component {
   _isMounted = false;
  static options(passProps) {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false
      },

       bottomTabs: {
           titleDisplayMode: 'showWhenActive', // Sets the title state for each tab.
           backgroundColor: '#0B7EF1',
      },
      bottomTab: {
        text: 'View Jobs',
        // badge: '2',
        // badgeColor: 'red',
                
       // selectedIconColor: 'blue',
        selectedTextColor: 'white',
        fontFamily: 'Helvetica',
       
        },
    
      overlay: {
        interceptTouchOutside: true
      },
    
             
    };
  }

   
     constructor(props){
       super(props);
       this.state = {
         recievedJobData : [],
         dataLoaded:false,
       }
       this.animatedValue = new Animated.Value(0) 
     }
  
    componentWillMount(){
           this._isMounted = true;
           this.props.getJobData().then(()=>{
            if(this._isMounted){
              this.setState({recievedJobData:this.props.JobReducer.jobData})
            }
           }).then(()=>{
            if(this._isMounted){
              this.setState({dataLoaded:true})
            }
           });
           this.animate()
          }
    
    componentWillUnmount(){
      this._isMounted = false;
    }      
      
    animate () {
      this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear
        }
      ).start(() => this.animate())
    }

    render() {

      const imageSize = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [50, 200, 50]
      })

    //  console.log(this.props.JobReducer.jobData)
         if(this.state.dataLoaded === true){
          return (
           <ImageBackground
             source = {BackgroundImage}
             style = {{flex:1,resizeMode:'cover'}}
           >
               <View style={styles.container}>
                <JobLocationMapDeck 
                  data = {this.state.recievedJobData.slice(0,10)}
                 />
            </View>
           </ImageBackground> 
         )
         }else{
           return (
            <ImageBackground
            source = {BackgroundImage}
            style = {{flex:1,resizeMode:'cover'}}
          >
              <View style={styles.spinnerStyle}>
                <Animated.Image 
                  source = {SearchIcon}
                  style={{width:imageSize,height:imageSize}}>
               </Animated.Image>
              </View>
           </ImageBackground>    
           )
         }
    }
} 

const styles = StyleSheet.create({
     spinnerStyle : {
       flex:1,
       alignItems: 'center',
       justifyContent:'center',
       },
       container:{
      
       }
})

function mapStateToProps(state){
  //console.log(['jobdata',state.JobReducer.jobData])
  
  return {
    JobReducer:state.JobReducer 
      }
 }

function mapDispatchToProps(dispatch){
   return bindActionCreators({getJobData},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(DeckScreen);