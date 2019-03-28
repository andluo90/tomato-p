import axios from '../../config/axios'

const initState = {
    account:''
}

export default function(state=initState,action:any){
    switch(action.type){
        case 'logout':{
            const newState = {account:'',...state}
            return newState
        }
        case 'getLoginInfo':{
            
            axios.get('me')
                 .then((res:any)=>{
                    return {account:res.data.account,...state}         
                 })
        }
        default:
            return state
    }
}