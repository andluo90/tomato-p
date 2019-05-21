
// 番茄闹钟列表
const initState = {
    tomatoList:[]
}

export default function(state=initState,action:any){

    switch (action.type){
        case 'updateTomatoList':
            return {
                tomatoList:action.payload
            }
        
        default:
            return state 

    }


}