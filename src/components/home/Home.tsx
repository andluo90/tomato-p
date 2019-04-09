import * as React from 'react'

import axios from '../../config/axios'

import {updateTodosAction,setEditingIdAction} from '../../redux/actions'

import {connect} from 'react-redux'

import './Home.scss'

import Header from './Header'
import Todos from './Todos'
import TodoItem from './TodoItem'
import Tomatos from './Tomatos'

interface IProps {
    todos:object[]
    updataingTodoId:number
    updateTodos:any
    setEditingId:any
}


class Home extends React.Component<IProps,{}> {


    get unDeletedTodos(){
        return this.props.todos.filter((item:any)=>!item.deleted)
    }

    get completedTodos(){
        return this.unDeletedTodos.filter((item:any)=>item.completed)
    }

    get unCompletedTodos(){
        return this.unDeletedTodos.filter((item:any)=>!item.completed)
    }

    async componentWillMount(){
        await this.getTodos()
                
    }



    async getTodos(){
        // 获取待办任务列表
        try {
            const res = await axios.get('todos')
            console.log(`get todos success..`)
            const newTodos = res.data.resources
            this.props.updateTodos(newTodos)
        } catch (error) {
            console.log('get todos error')
            console.log(error)
        }
        
    }



    addTodo(item:string){
        // 先添加到页面再作渲染，提高页面响应
        const tmp = [...this.props.todos]
        let newTodos = [{description:item},...this.props.todos]
        this.props.updateTodos(newTodos)
        

        axios.post('todos',{description:item})
             .then((res)=>{
                console.log('add todo success..')
                console.log(res)
                newTodos = [res.data.resource,...tmp]
                this.props.updateTodos(newTodos)
                
             })
             .catch((error)=>{
                 console.log('add todo request error...')
                 console.log(error)
             })
        
    }



    

    render(){
        const {updataingTodoId} = this.props
        return (
            <div id='home'>
                <Header />
                <main>
                    <div className='wrapper'>
                        <Tomatos />
                        <Todos addTodo={(item:string)=>this.addTodo(item)}>
                            {this.unCompletedTodos.map((item:any)=>{
                                return (<TodoItem key={item.id} 
                                                id={item.id} 
                                                description = {item.description}
                                                completed = {item.completed}
                                                deleted = {item.deleted}
                                                IsEditing={updataingTodoId === item.id}  />)
                            })}
                            {this.completedTodos.map((item:any)=>{
                                return (<TodoItem key={item.id}
                                                id={item.id} 
                                                description = {item.description}
                                                completed = {item.completed}
                                                deleted = {item.deleted}
                                                IsEditing={updataingTodoId === item.id}  />)
                            })}
                        </Todos>
                    </div>
                  
                </main>
            </div>
        )
    }

}


function mapStateToProps(state:any){
    return {
        todos:state.home.todos,
        updataingTodoId:state.home.updataingTodoId
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        updateTodos:(todos:object[])=> dispatch(updateTodosAction(todos)),
        setEditingId:(id:number)=> dispatch(setEditingIdAction(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)