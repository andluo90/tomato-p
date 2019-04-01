

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
        case 'updateTodo':
            const newState = Object.assign({},state)
            const newTodos = newState.todos.map((item:any)=>{
                if(item.id === action.payload.id){
                    return {...item,...action.payload}
                }
                return item
            })
            return {...newState,todos:newTodos}
            
        default:
            return state
    }
}