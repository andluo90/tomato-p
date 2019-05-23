import * as React from 'react'

import {Link} from 'react-router-dom'

import axios from '../../config/axios'

import {connect} from 'react-redux'

import { Menu, Dropdown, Button, Icon , message } from 'antd';


interface IProps {
    account:string
    logout:any
    setUserInfo:any
}

class Header extends React.Component<IProps>{

    handleClick(e:any){
        if(e.key === '2'){
            localStorage.setItem('x-token','')
            this.props.logout()
            message.info('退出成功.',2);
            
        }else if(e.key === '1'){
            message.warn('该功能暂未实现',2);
        }
    }

    componentDidMount(){
        this.getLoginInfo()
    }

    getLoginInfo(){
        axios.get('me')
             .then((res:any)=>{
                this.props.setUserInfo(res.data.account)
             })
             .catch((error)=>{
                 console.log(error)
             })
    }

    render(){
        const {account} = this.props
        
        const menu = (
            <Menu onClick={(e)=>this.handleClick(e)}>
              <Menu.Item key="1"><Icon type="user" />偏好设置</Menu.Item>
              <Menu.Item key="2" ><Icon type="logout" />退出</Menu.Item>
            </Menu>
        );

        let btn;
        if (account === undefined || account === ''){
            btn = (<Link to='/login'><Button>登录</Button></Link>)
        }else {
            btn = (
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        {this.props.account} <Icon type="down" />
                    </Button>
                </Dropdown>
            )
        }
    
        return (
            <header>
                <div className='logo'>番茄土豆</div>
                {btn}
            </header>
            )
        
    }
}

function mapStateToProps(state:any){
    
    return {
        account:state.header.account
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        logout:()=>dispatch(logoutAction()),
        setUserInfo:(account:any)=>{
            dispatch(setUserInfoAction(account))
        }
    }
}

function logoutAction(){
    return {
        type:'logout'
    }
}

function setUserInfoAction(account:string){
    return {
        type:'setUserInfo',
        payload:account
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Header)