import * as React  from 'react'

import {Button,Input,Icon,Spin,message} from 'antd'

import axios from '../../config/axios'

import {Link,Redirect} from 'react-router-dom'

import './Login.scss'

/**
 * 登录组件
 */

interface IState {
    userName:string,
    password:string,
    login_success:boolean
    loading:boolean
}

export default class Login extends React.Component<{},IState>{
    
    constructor(props:any){
        super(props)
        this.state = {
            userName:'',
            password:'',
            login_success:false,
            loading:false
        }

        this.submit = this.submit.bind(this)
    }

    

    emitEmpty = () => {
        // this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    

    onChangeUserName(e:any){
        this.setState({
            userName:e.target.value
        })

    }

    onChangePassword(e:any){
        this.setState({
            password:e.target.value
        })
    }

    submit(){

        const {userName,password} = this.state

        if(userName==='' || password===''){
            message.warn('账号或密码不能为空.')
        }else{
            this.setState({
                loading:true
            })
            axios.post('sign_in/user',{
                account:this.state.userName,
                password:this.state.password
            }).then((res:any)=>{
                console.log(res) 
                this.setState({
                    login_success:true
                })
                
    
            }).catch((e:any)=>{
                console.log("请求报错...")
                message.error('登录失败:账号或密码错误.')
                this.setState({
                    loading:false
                })
                console.log(e)
            })
        }
        
    }



    render(){
        if(this.state.login_success){
            return (
                <Redirect to='/' />
            )
        }
        const {userName} = this.state
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

        return (
            <div id = 'login'>
                <h1>登录</h1>
                <Input
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={suffix}
                    value={this.state.userName}
                    onChange={(e)=>{this.onChangeUserName(e)}}
                    onPressEnter={this.submit}

                 />
                 <Input.Password
                    placeholder="请输入密码"
                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                    // suffix={suffix}
                    value={this.state.password}
                    onChange={(e)=>{this.onChangePassword(e)}}
                    onPressEnter={this.submit}
                 />
                <Spin spinning={this.state.loading}>
                    <Button type='primary' onClick={this.submit} >登录</Button>
                </Spin>
                <span>Or <Link to='/register'>立即注册</Link></span>
                <span> / <Link to='/'>首页</Link></span>

            </div>
        )
    }
}