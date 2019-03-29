

export default function(state={account:''},action:any){
    switch(action.type){
        case 'logout':{
            const newState = {account:''}
            return newState
        }
        case 'setUserInfo':{
            return {account:action.payload}
            
        }
        default:
            return state
    }
}