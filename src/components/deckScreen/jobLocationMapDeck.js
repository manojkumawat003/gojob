import React, { Component } from 'react';
import {  View, DeckSwiper, Card, CardItem, Text, Left, Body, Icon,Button,Toast   } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Linking,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import firebase from 'react-native-firebase';

import {saveDataToReview,fetchSavedData} from '../../store/actions/job_data_action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



class JobLocationMapDeck extends Component {

      constructor(props){
        super(props);
        this.state={
            region : {
                latitude: 37,
                longitude: -122,
                latitudeDelta: 0.10,
                longitudeDelta: 0.05,
            },
        cardData:'',
        dataLoaded:false,
        orientation:'',
        saveToReview:'',
        idToken:'',
        firebaseFetchedData:'',
         };
        
         this.saveToReview = '';
      }


    componentWillMount(){
           this.updateCardData();
           this.setState({dataLoaded:true});
           this.checkOrientation();

          firebase.auth().currentUser.getIdToken(true).then((data)=>this.setState({idToken:data}));
           }
  
     componentDidMount(){
      Dimensions.addEventListener( 'change', () =>
      {
        this.checkOrientation();
      });
      }

    updateCardData = () => {
      this.setState({cardData:this.props.data});
          }

     checkOrientation = () =>{
       if(SCREEN_WIDTH < SCREEN_HEIGHT){
         this.setState({orientation:'Portrait'})
       }else{
         this.setState({orientation:'Landscape'})
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

     
    onSwipeRight(dataItem){
      const UID = firebase.auth().currentUser.uid;   
      var database = firebase.database().ref(`savedData/${UID}/`).orderByChild('Id').equalTo(dataItem.Id);
         
            database.on('value', function (snapshot) {
              //    console.log(snapshot.val())
                  var data = snapshot.val();
                  
                  if(data !== null){
                   // console.log(data);
                    console.log('duplicate data found!');
                   
                   }else{
                   //  console.log('no duplicate data found')
                     var rootRef = firebase.database().ref(`savedData/${UID}/`);
                   
                     var newStoreRef = rootRef.push();
                     newStoreRef.set(dataItem);
                             
                       };
                               
              });

          setTimeout(()=>{
            this.props.saveDataToReview(UID,this.state.idToken)         
          },3000)
              
           }
    
   onSwipeLeft(){
    const UID = firebase.auth().currentUser.uid;
    this.props.saveDataToReview(UID,this.state.idToken)
   }        
      
  render() {
   
       //////////for portrait view////////screen rotation////
      if(this.state.orientation === 'Portrait'){
        if(this.state.dataLoaded === true){
          return (
              <View style={styles.container}>
                <DeckSwiper
                  dataSource={this.state.cardData}
                  renderEmpty = {()=> <View style={{ alignSelf: "center",alignItems: 'center',justifyContent:'center',flex:1 }}>
                                         <Text>Over!!!</Text>
                                      </View>
                                  }
                  onSwipeRight = {()=>this.onSwipeRight(this.saveToReview)}  
                  onSwipeLeft = {()=>this.onSwipeLeft()}              
                  renderItem={(item) =>
                  {  this.saveToReview = item;
                    return (
                    <Card style={{elevation:3}}>
                    <CardItem  style={{backgroundColor:'#3CB371'}}>
                      <Left>
                        <Body>
                          <Text style={{fontSize:20,color:'white'}}>{item.Title}</Text>
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
                   
                    <CardItem cardBody style={{backgroundColor:'#c170db'}}>
                         <Body style={{margin:5,padding:3,flex:1,flexDirection:'row'}}>
                            <Icon name="md-locate" style={{ color: '#4169E1',marginRight: 6, }}/>
                            <Text>{item.Brand}</Text>
                         </Body>
                     </CardItem>
                     
                    <CardItem cardBody style={{backgroundColor:'white'}}>
                        <Body style={{margin:5,padding:3,flex:1,flexDirection:'row'}}>
                          <Icon type="FontAwesome5" name="file-contract" style={{ color: '#ED4A6A',marginRight: 6, }} />
                          <Text>{item.WorkType}</Text>
                        </Body>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor:'white'}}>
                        <Body>
                          <Button style={{width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'green'}}
                            onPress = {()=> Linking.openURL(`${item.ApplyUrl}`)}
                          >
                            <Text style={{textAlign:'center'}}>Apply</Text>
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
                 }
                  }
                />  
      
              </View>
           
          );
         } else {
            return (
               <Text>No data Found</Text>
            )
         }
      }       //////////for landscape view////////screen rotation////
      else {
         if(this.state.dataLoaded === true){
            return (
                <View >
                  <DeckSwiper
                    dataSource={this.state.cardData}
                    onSwipeRight = {()=>this.onSwipeRight(this.saveToReview)} 
                    onSwipeLeft = {()=>console.log('SwipedLeft')}   
                    renderEmpty = {()=> <View style={{ alignSelf: "center",alignItems: 'center',justifyContent:'center',flex:1 }}>
                                         <Text>Over!!!</Text>
                                      </View>
                                  }
                    renderItem={(item) => 
                      {  this.saveToReview = item;
                        return (
                      <Card style={{elevation:3}}>
                        <CardItem  style={{backgroundColor:'#3CB371'}}>
                          <Left>
                            <Body>
                              <Text style={{fontSize:20,color:'white'}}>{item.Title}</Text>
                              <Text note style={{color:'black'}}>Job Id: {item.Id}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                      
                        <CardItem cardBody>
                          <MapView
                              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                              style={{height: SCREEN_HEIGHT/4, flex: 1 }}
                              region={this.state.region }
                            //  onRegionChange={this.onRegionChange}
                          >
                    </MapView>
                        </CardItem>
                       
                        <CardItem cardBody style={{backgroundColor:'#c170db',flexDirection:'row'}}>
                             <Body style={{margin:5,padding:3,flex:1,flexDirection:'row'}}>
                                <Icon name="md-locate" style={{ color: '#4169E1',marginRight: 6, }}/>
                                <Text>{item.Brand}</Text>
                             </Body>
                             <Body style={{margin:5,padding:3,flex:1,flexDirection:'row'}}>
                                <Icon type="FontAwesome5" name="file-contract" style={{ color: '#ED4A6A',marginRight: 6, }} />
                                <Text>{item.WorkType}</Text>
                             </Body>

                         </CardItem>
                        
                     
                        <CardItem cardBody style={{backgroundColor:'white',flexDirection:'row'}}>
                            <Body>
                              <Button style={{width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'green'}}
                                onPress = {()=> Linking.openURL(`${item.ApplyUrl}`)}
                              >
                                <Text style={{textAlign:'center'}}>Apply</Text>
                              </Button>
                            </Body>
                            <Body style={{alignItems: 'center',justifyContent:'center'}}>
                                 <TouchableOpacity
                                     onPress = {()=>this.detailScreen(item)}
                                  >
                                    <Text style={{padding:5}}>More details...</Text>
                                 </TouchableOpacity>
                            </Body>
                        </CardItem>
                        
                      </Card>
                      )
                        }
                    }
                  />  
        
                </View>
             
            );
           } else {
              return (
                 <Text>No data Found</Text>
              )
           }
        }
      }
      }
    


const styles = StyleSheet.create({
  container:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
//justifyContent:'center',
  }
})

function mapStateToProps(state){
  return {
    JobReducer:state.JobReducer 
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({saveDataToReview,fetchSavedData},dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)(JobLocationMapDeck);
