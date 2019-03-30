
const initState = {
    taskName:'',
    todos:[]
}

export default function(preState=initState,action:any){
    const {taskName,todos} = preState

    switch(action.type){
        case 'addTodo':{
            const newTodos = [{description:taskName},...todos]
            return {taskName,todos:newTodos}
        }
        case 'changeInput':{
            return {...preState,taskName:action.payload}
        }
        default:
            return preState
    }
}