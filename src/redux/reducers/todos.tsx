
const initState = {
    inputTaskName:'',
}

export default function(state=initState,action:any){

    switch(action.type){
        case 'changeInput':{
            return {inputTaskName:action.payload}
        }
        default:
            return state
    }
}