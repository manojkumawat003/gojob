import React, {Component} from 'react';
import {StyleSheet,Dimensions,TouchableOpacity,Linking,ScrollView,Animated,Easing,Image } from 'react-native';
import firebase from 'react-native-firebase';
import {  View, Card, CardItem, Text, Left, Body, Icon,Button,Toast   } from 'native-base';
import {fetchSavedData} from '../../store/actions/job_data_action';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Navigation} from 'react-native-navigation';

import FishImage from '../../assets/fish-300.png';
import BubbleImage from '../../assets/bubble.png';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


class ShowSavedCards extends Component {

      _isMounted = false;
     constructor(props){
         super(props);
         this.state={
             recievedDataInObjectForm:'',
             idToken:'',
             objectToArrayData:'',
         }
         this.animatedValue = new Animated.Value(0);
          
     }   

  
////////////animation when card is empty//////////a swiming fish////
     componentDidMount(){
      this.animate()
     }

     animate () {
      this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear
        }
      ).start(() => this.animate())
    }
//////////////////////////////////////
     componentWillMount(){
       
          this._isMounted = true;   
       firebase.auth().currentUser.getIdToken(true).then((data)=>
      {
        if(this._isMounted){
          this.setState({idToken:data})
        }
      }
       );   
     
        this.fetchDataFromDatabase()
     
        
        ////////////firebase method//////
          // this.time= setTimeout(()=>{
          //   this.firebaseMethodToFetchData()
          // },1000)
        }
      
       
      componentWillUnmount(){
          this._isMounted=false;
      
      }

     

      fetchDataFromDatabase(){
        const UID = firebase.auth().currentUser.uid;
       
         this.props.fetchSavedData(UID,this.state.idToken).then(()=>{
         if(this._isMounted){
          this.setState({recievedDataInObjectForm:this.props.JobReducer.recievedSavedData});
         }
          this.convertObjectToArray()
          })
      }  
///////////////////////////firebase method/////////////
     /*  firebaseMethodToFetchData(){
               ///uncomment this////
     /// const UID = firebase.auth().currentUser.uid;

        ////delete this//
        const UID = `AcH4EMrNi1N3mAETBMUu0785GZs2`;
        var component = this; //////resolves- this.setState is not a function
        var database = firebase.database().ref(`savedData/${UID}/`);
         database.on('value', function (snapshot) {
             // console.log(snapshot.val())
               var data = snapshot.val();
               if(data !== null){
                 console.log(['data',data]);
                 component.setState({recievedDataInObjectForm:data});
                              
                }else{
                  console.log('Database is Empty!!')
                 
                    };
                            
           });

            setTimeout(()=>{
                console.log(['recievedDataInObject',this.state.recievedDataInObjectForm])
               this.convertObjectToArray();
            },500)           

      } */
/////////////////////////////////////////////////////
      convertObjectToArray(){
       if(this.state.recievedDataInObjectForm !== null){
        this._isMounted = true;
        var obj = this.state.recievedDataInObjectForm;
        var result = Object.keys(obj).map(key =>{
               return obj[key]
        });
          if(this._isMounted){
            this.setState({objectToArrayData:result})
          }
       }
      }

      detailScreen = (item) => {
        Navigation.showModal({
          stack: {
            children: [{
              component: {
                id:'detailScreenId',
                name: 'gojob.DetailScreen',
                passProps: {
                 item            
                },
                options: {
                  topBar: {
                    title: {
                      text: item.Title,
                      color:'white'
                    },
                   
                  }
                }
              }
            }]
          }
        });
       }    

       deleteCard(item){
                ///uncomment this////
      const UID = firebase.auth().currentUser.uid;
        var database = firebase.database().ref(`savedData/${UID}/`).orderByChild('Id').equalTo(item.Id);
 
         database.on('value', function (snapshot) {
                    console.log(snapshot.val());
                   snapshot.forEach(function(childSnapshot) {
                      //remove each child
                   firebase.database().ref(`savedData/${UID}/`).child(childSnapshot.key).remove(); })
                });
         setTimeout(()=>{
           this.fetchDataFromDatabase()
           // this.firebaseMethodToFetchData()
         },1000)
       }

      renderCards(){
        //  console.log(['objectToArrayData',this.state.objectToArrayData])
        return  this.state.objectToArrayData.map((item,index) => {
          return (
                        
                   <Card style={{elevation:3, marginBottom: 10,}} key={index}>
            <CardItem  style={{backgroundColor:'#3CB371'}}>
              <Left>
                <Body>
                  <Text numberOfLines={1} style={{fontSize:20,color:'white',flex:1}}>{item.Title}</Text>
                  <Text note style={{color:'black'}}>Job Id: {item.Id}</Text>
                </Body>
              </Left>
            </CardItem>
          
            <CardItem cardBody>
              <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={{ height: SCREEN_HEIGHT/4, flex: 1 }}
                  region={this.state.region }
                //  onRegionChange={this.onRegionChange}
              >
        </MapView>
            </CardItem>
           
            <CardItem cardBody style={{backgroundColor:'#c170db',flexDirection:'row'}}>
                 <Body style={{padding:5,flex:1,flexDirection:'row'}}>
                    <Icon name="md-locate" style={{ color: '#4169E1',marginRight:2, }}/>
                    <Text  numberOfLines={1} style={{flex:1}}>{item.Brand}</Text>
                 </Body>
                 <Body style={{padding:5,flex:1,flexDirection:'row'}}>
                  <Icon type="FontAwesome5" name="file-contract" style={{ color: '#ED4A6A',marginRight: 2, }} />
                  <Text  numberOfLines={1} style={{flex:1}}>{item.WorkType}</Text>
                </Body>
             </CardItem>
                        
            <CardItem cardBody style={{backgroundColor:'white'}}>
                <Body style={{flex:1,flexDirection:'row'}}>
                  <Button style={{width:'50%',alignItems: 'center',justifyContent:'center',backgroundColor:'green'}}
                    onPress = {()=> {Linking.openURL(`${item.ApplyUrl}`)}}
                  >
                    <Text style={{textAlign:'center'}}>Apply</Text>
                  </Button>
                  <Button style={{width:'50%',alignItems: 'center',justifyContent:'center',backgroundColor:'red'}}
                    onPress = {()=> this.deleteCard(item)}
                  >
                    <Text style={{textAlign:'center'}}>Delete</Text>
                  </Button>
      
                </Body>
            </CardItem>
            <CardItem cardBody style={{margin:5}}>
                <Body style={{alignItems: 'center',justifyContent:'center'}}>
                     <TouchableOpacity
                         onPress = {()=>this.detailScreen(item)}
                      >
                        <Text style={{padding:5}}>More details...</Text>
                     </TouchableOpacity>
                </Body>
            </CardItem>
          </Card>
                   
             
            );
          })
      
      }  

    render() {   

      const movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5,1],
        outputRange: [SCREEN_WIDTH, SCREEN_WIDTH,-SCREEN_WIDTH/2]
      });
      const opacity = this.animatedValue.interpolate({
        inputRange: [0, 0,0.5, 1],
        outputRange: [0, 0,1, 0]
      })
    
                 if(this.state.objectToArrayData === ''){
                     return(
                        <View style={{flex:1,justifyContent:'center',marginTop:50}}>
                        
                            <View style={{flexDirection:'row'}}>
                            <Animated.View
                              style={{opacity}}
                            >
                                  <Image 
                                    source = {BubbleImage}
                                    style={{width:30,height:30}}
                                  />
                           </Animated.View>  
                           <Animated.View
                              style={{marginLeft: movingMargin}}
                             >
                             <Image 
                                    source = {FishImage}
                                    style={{width:100,height:65}}
                                  />
                          </Animated.View>  
                            </View>
                         
                      </View>
                     )
                 } else {
                     return (
                         <ScrollView>
                            <View style={styles.container}>
                              {this.renderCards()}
                          </View>
                         </ScrollView>
                     )
                 }
    }
} 

const styles = StyleSheet.create({
  container:{
   flex:1, 
   margin:20,
    
  }
})

export function mapStateToProps(state){
  // console.log(['jobReducer',state.JobReducer.recievedSavedData])
    return {
      JobReducer: state.JobReducer
    }
}

export function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchSavedData},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowSavedCards);

