import * as React from 'react'

import axios from '../../config/axios'

import {message} from 'antd'

import './Home.scss'

import Header from './Header'

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
                 console.log(res)
                 this.setState({
                     user:res.data
                 })
             })
             .catch((error:any)=>{
                 console.log(`get me error..`)
                 console.log(error)
             })
        
    }

    headerClickHandle(e:any){
        if(e.key === '2'){
            localStorage.setItem('x-token','')
            this.setState({user:''})
            message.info('退出成功.');
            console.log('click left button', e);
        }else if(e.key === '1'){
            message.warn('该功能暂未实现');
        }
    }

    render(){
        
        return (
            <div id='home'>
                <Header account = {this.state.user.account} onClickHandle={(e:any)=>this.headerClickHandle(e)} />
            </div>
        )
    }

}