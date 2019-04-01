
export const logoutAction = {
    type:'logout'
}

export const getLoginInfoAction = {
    type:'getLoginInfo'
}

export const updateTodosAction = (todos:object[])=>{
    return {
        type:'updateTodos',
        payload:todos
    }
}

export const setEditingIdAction = (id:number)=>{
    return {
        type:'setEditingId',
        payload:id
    }
}


export const changeInput = (name:string)=>{
    return {
        type:'changeInput',
        payload:name
    }
}

export const updateTodoAction = (todo:object)=>{
    return {
        type:'updateTodo',
        payload:todo
    }
}