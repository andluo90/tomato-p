import * as React from 'react'

import axios from '../../config/axios'

import {message} from 'antd'

import './Home.scss'

import Header from './Header'
import {Todos} from './Todos'
import {TodoItem} from './TodoItem'

interface IState {
    user:any;
    todos:object[];
    updataingTodoId:number
}


export default class Home extends React.Component<{},IState> {

    constructor(props:any){
        super(props)
        this.state= {
            user:'',
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
        await this.getMe()
        await this.getTodos()
                
    }

    async getMe(){
        // 获取个人信息
        try {
            const res = await axios.get('me')
            console.log(`get me success`)
            this.setState({
                user:res.data
            })         
        } catch (error) {
            console.log(`get me error`)
            console.log(error)
        }
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

    headerClickHandle(e:any){
        if(e.key === '2'){
            localStorage.setItem('x-token','')
            this.setState({user:''})
            message.info('退出成功.',2);
            console.log('click left button', e);
        }else if(e.key === '1'){
            message.warn('该功能暂未实现',2);
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
                <Header account = {this.state.user.account} onClickHandle={(e:any)=>this.headerClickHandle(e)} />
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