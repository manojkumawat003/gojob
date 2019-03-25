import React,{Component} from 'react';
import {View,StyleSheet,Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { Spinner } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MapViewHome extends Component {
   
    constructor(props) {
        super(props);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.state={
            region : {
                latitude: 37,
                longitude: -122,
                latitudeDelta: 0.10,
                longitudeDelta: 0.05,
            },
            mapLoded:false,
        };
      }

    
    onRegionChange(region) {
        this.setState({ 
            region:region
         })
     //   console.log(region)
      }

   render(){
       if(!this.state.mapLoded){
        return (
            <View style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={this.state.region }
              onRegionChange={this.onRegionChange}
            >
            </MapView>
          </View>
           )
       }else {
        return (
            <View>
               <Spinner color='green' />
          </View>
           )
       }
      
   }

}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
   });

   export default MapViewHome;