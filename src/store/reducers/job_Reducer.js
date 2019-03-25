

export default function(state={},action){
    switch(action.type){
        case 'job_data':
                 return {...state,jobData:action.payload};
        case 'FETCH_SAVED_DATA' :
                 return {...state,recievedSavedData:action.payload}                
        default:
             return state;           
    }
}