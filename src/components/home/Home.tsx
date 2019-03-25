import * as React from 'react'

import axios from '../../config/axios'

import {message} from 'antd'

import './Home.scss'

import Header from './Header'
import {Todos} from './Todos'

interface IState {
    user:any;
    todos:object[];
}


export default class Home extends React.Component<{},IState> {

    constructor(props:any){
        super(props)
        this.state= {
            user:'',
            todos:[]
        }
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
        axios.post('todos',{description:item})
             .then((res)=>{
                console.log('add todo success..')
                console.log(res)
                const newTodos = [res.data.resource,...this.state.todos]
                this.setState({
                    todos:newTodos
                })
             })
             .catch((error)=>{
                 console.log('add todo request error...')
                 console.log(error)
             })
        
    }

    render(){
        
        return (
            <div id='home'>
                <Header account = {this.state.user.account} onClickHandle={(e:any)=>this.headerClickHandle(e)} />
                <main>
                    <Todos todos={this.state.todos} addTodo={(item:string)=>this.addTodo(item)} />
                </main>
            </div>
        )
    }

}