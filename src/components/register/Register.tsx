import * as React from 'react'

import {Button,Input,Icon,Spin,message} from 'antd'


import axios from '../../config/axios'

import {Link,Redirect} from 'react-router-dom'

import './Register.css'


interface IState {
    account:string,
    password:string,
    password_confirmation:string,
    IsRegisterSuccess:boolean,
    loading:boolean
    [x:string]:any
}


export default class Register extends React.Component<{},IState> {

    constructor(props:object){
        super(props)
        this.state = {
            account:'',
            password:'',
            password_confirmation:'',
            IsRegisterSuccess:false,
            loading:false
        }

        this.submit = this.submit.bind(this)
        this.emitEmpty = this.emitEmpty.bind(this)
    }

    onChangeInput(key:string,value:any){
        this.setState({
            [key]:value
        })
    }

    emitEmpty(){
        this.setState({ account: '' });

    }

    submit(){
        const {account,password,password_confirmation} = this.state
        if(account==='' || password==='' || password_confirmation===''){
            message.warn('账号或密码不能为空.')
        }else{
            this.setState({
                loading:true
            })
            console.log("开始注册...")
            axios.post('sign_up/user',{
                account:this.state.account,
                password:this.state.password,
                password_confirmation:this.state.password_confirmation
            }).then((res)=>{
                console.log('请求成功')
                this.setState({
                    IsRegisterSuccess:true
                })
            }).catch((error)=>{
                console.log('请求报错...')
                message.error('注册失败.')
                this.setState({
                    loading:false
                })
                console.log(error)
            })
        }
    }

    render(){
        if(this.state.IsRegisterSuccess){
            return (<Redirect to='/' />)
        }

        return (
            <div id='register'>
                <h1>注册</h1>
                <Input
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={ this.state.account ? <Icon type="close-circle" onClick={()=>{this.emitEmpty()}} /> : null }
                    value={this.state.account}
                    onChange={(e)=>{this.onChangeInput('account',e.target.value)}}
                 />
                 <Input.Password
                    placeholder="请输入密码"
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={this.state.password}
                    onChange={(e)=>{this.onChangeInput('password',e.target.value)}}
                 />
                 <Input.Password
                    placeholder="请再次输入密码"
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={this.state.password_confirmation}
                    onChange={(e)=>{this.onChangeInput('password_confirmation',e.target.value)}}
                 />
                <Spin spinning={this.state.loading}>
                    <Button type='primary' onClick={this.submit}>注册</Button>
                </Spin>
                <span>Or <Link to='/login'>立即登录</Link></span>
                <span> / <Link to='/'>首页</Link></span>

            </div>
        )
    }
}