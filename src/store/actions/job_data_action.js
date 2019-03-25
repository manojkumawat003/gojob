import axios from 'axios';
import firebase from 'react-native-firebase';



const FIREBASE_URL = `https://gojob-d3902.firebaseio.com`;


export function getJobData(){
//////////fake api from rapid api/////
    const request = axios({
        url:"https://simoncar-jobs-v1.p.rapidapi.com/688/cwlive/en/jobs.json?",
        headers:{
            "X-RapidAPI-Key": "9296d25398msh60f679680942e81p1d52e1jsn26369b141ced"
        }
             
    }).then(response=>{
    //   console.log(response.data)
        return response.data
    })
    
    .catch(error =>{
        console.log(error)
    })

    return  {
        type:'job_data',
        payload:request
    }
    
}
      
/////fetch saved data from firebase//////

export function fetchSavedData(uid,TOKEN){
      
       const request = axios({
        method:'GET',
        url:`${FIREBASE_URL}/savedData/${uid}.json`,
            params:{
            auth : `${TOKEN}`
           },
    }).then((response)=>{
         return response.data
       // console.log(response.data)
    }).catch(error=>{
        console.log(error)
    })

    return {
        type: 'FETCH_SAVED_DATA',
        payload:request
    }
}


       /////store right swiped data on firebase////
  export function saveDataToReview(UID,TOKEN){
  
    
        return dispatch => {
             setTimeout(()=>{
                dispatch(fetchSavedData(UID,TOKEN))
            },1000)
          
        }   

    };


   