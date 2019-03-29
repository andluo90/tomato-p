import * as React from 'react'

import axios from '../../config/axios'

import './Home.scss'

import Header from './Header'
import {Todos} from './Todos'
import {TodoItem} from './TodoItem'

interface IState {
    todos:object[];
    updataingTodoId:number
}


export default class Home extends React.Component<{},IState> {

    constructor(props:any){
        super(props)
        this.state= {
            todos:[],
            updataingTodoId:-1
        }
    }

    get unDeletedTodos(){
        return this.state.todos.filter((item:any)=>!item.deleted)
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
            console.log(res)
            const newTodos = res.data.resources
            this.setState({
                todos:newTodos
            })
            console.log(newTodos)
        } catch (error) {
            console.log('get todos error')
            console.log(error)
        }
        
    }



    addTodo(item:string){
        // 先添加到页面再作渲染，提高页面响应
        const tmp = [...this.state.todos]
        let newTodos = [{description:item},...this.state.todos]
        this.setState({
            todos:newTodos
        })

        axios.post('todos',{description:item})
             .then((res)=>{
                console.log('add todo success..')
                console.log(res)
                newTodos = [res.data.resource,...tmp]
                this.setState({
                    todos:newTodos
                })
             })
             .catch((error)=>{
                 console.log('add todo request error...')
                 console.log(error)
             })
        
    }

    updataEditingId = (id:number):void=>{
        this.setState({
            updataingTodoId:id
        })
    }

    

    render(){
        
        return (
            <div id='home'>
                <Header />
                <main>
                    <Todos addTodo={(item:string)=>this.addTodo(item)}>
                        {this.unCompletedTodos.map((item:any)=>{
                            if(this.state.updataingTodoId === item.id){
                                return (<TodoItem key={item.id} item={item} IsEditing={true} updataEditingId={this.updataEditingId} />)
                            }
                            return (<TodoItem key={item.id} item={item} IsEditing={false} updataEditingId={(id:number)=>this.updataEditingId(id)} />)
                        })}
                        {this.completedTodos.map((item:any)=>{
                            if(this.state.updataingTodoId === item.id){
                                return (<TodoItem key={item.id} item={item} IsEditing={true} updataEditingId={this.updataEditingId} />)
                            }
                            return (<TodoItem key={item.id} item={item} IsEditing={false} updataEditingId={(id:number)=>this.updataEditingId(id)} />)
                        })}
                    </Todos>
                </main>
            </div>
        )
    }

}