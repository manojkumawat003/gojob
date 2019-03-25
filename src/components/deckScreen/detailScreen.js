import React, {Component} from 'react';
import {StyleSheet,View,Text,ScrollView,Button,Linking} from 'react-native';
import {Navigation} from 'react-native-navigation';

class DetailScreen extends Component {
    static options(item) {
        return {
          topBar: {
             animate: true,
             leftButtons: {
                id: 'backButton',
                icon: require('../../assets/left-arrow.png'),
               },
              background: {
                color: '#3CB371',
               }
             }
        };
      }
    
      constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); 
      }
    
      
      navigationButtonPressed({ buttonId }) {
       
        if(buttonId === 'backButton'){
            Navigation.dismissAllModals();
            }
         }
          
  
    render() {
        return (
         <ScrollView>
           <View style={styles.container}>
               <View style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Summary</Text>
                 <Text style={styles.text}>{this.props.item.Summary}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Overview</Text>
                 <Text style={styles.text}>{this.props.item.Overview}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Categories</Text>
                 <Text style={styles.text}>{this.props.item.Categories}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Location</Text>
                 <Text style={styles.text}>{this.props.item.Location}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Work Type</Text>
                 <Text style={styles.text}>{this.props.item.WorkType}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Job Sector</Text>
                 <Text style={styles.text}>{this.props.item.JobSector}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Brand</Text>
                 <Text style={styles.text}>{this.props.item.Brand}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Recruiter</Text>
                 <Text style={styles.text}>{this.props.item.Recruiter}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Salary</Text>
                 <Text style={styles.text}>{this.props.item.Salary}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Pay Scale</Text>
                 <Text style={styles.text}>{this.props.item.PayScale}</Text>
               </View>
               <View  style={styles.content}>
                 <Text style={{fontSize:16,fontWeight:'bold'}}>Job System Type</Text>
                 <Text style={styles.text}>{this.props.item.JobSystemType}</Text>
               </View>
               <View  style={styles.content}>
                  <Button 
                      title = 'Apply Now'
                    //  style={{width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'green'}}
                      onPress = {()=>Linking.openURL(`${this.props.item.ApplyUrl}`)}
                    />
               </View>
           </View>
        </ScrollView>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:4
         },
    text:{
        fontSize:16,
        marginLeft:4,
        padding:3
        },
     content:{
         marginBottom:5,
         borderBottomWidth:1,
         borderColor:'grey'
     }   

})



export default DetailScreen;