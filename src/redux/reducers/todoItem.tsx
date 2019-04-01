

const initState = {
    description:null,
    checked:null,
    deleted:null
}

export default function(state=initState,action:any){
    switch(action.type){
        case 'init':
            const {description,checked,deleted} = action.payload
            console.log({description,checked,deleted})
            return {description,checked,deleted}
        case 'setChecked':
            return {...state,checked:action.payload}
        case 'setDeleted':
            return {...state,deleted:action.payload}
        case 'setDescription':
            return {...state,description:action.payload}
        default:
            return state
    }
}