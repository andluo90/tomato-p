

const initState = {
    todos:[],
    updataingTodoId:-1
}

export default function(state=initState,action:any){
    switch(action.type){
        case 'updateTodos':
            return {...state,todos:action.payload}
        case 'setEditingId':

            return {...state,updataingTodoId:action.payload}

        default:
            return state
    }
}