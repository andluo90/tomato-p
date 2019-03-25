import * as React from 'react'

import axios from '../../config/axios'

import {message} from 'antd'

import './Home.scss'

import Header from './Header'
import {Todos} from './Todos'

interface IState {
    [x:string]:any
}


export default class Home extends React.Component<{},IState> {

    constructor(props:any){
        super(props)
        this.state= {
            user:''
        }
    }

    componentWillMount(){
        axios.get('me')
             .then((res:any)=>{
                 console.log(`get me success`)
                 this.setState({
                     user:res.data
                 })
             }).then(()=>{
                 axios.get('todos')
             }).then((res:any)=>{
                 console.log(   `get totods success`)
                 console.log(res)
             })
             .catch((error:any)=>{
                 if (error.response.status === 401){
                     console.log("401:未授权")
                 }else {
                    console.log('get me error...')
                    console.log(error)

                 }
             })
        
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
                    <Todos addTodo={(item:string)=>this.addTodo(item)} />
                </main>
            </div>
        )
    }

}