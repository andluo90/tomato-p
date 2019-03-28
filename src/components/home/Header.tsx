import * as React from 'react'

import {Link} from 'react-router-dom'

import {logoutAction,getLoginInfoAction} from '../../redux/actions'
import {connect} from 'react-redux'
import { Menu, Dropdown, Button, Icon , message } from 'antd';


interface IProps {
    account:string
    logout:any
    getLoginInfo:any
}

class Header extends React.Component<IProps>{

    handleClick(e:any){
        if(e.key === '2'){
            localStorage.setItem('x-token','')
            this.props.logout()
            message.info('退出成功.',2);
            console.log('click left button', e);
        }else if(e.key === '1'){
            message.warn('该功能暂未实现',2);
        }
    }

    componentDidMount(){
        this.props.getLoginInfo()
    }

    render(){
        const {account} = this.props

        const menu = (
            <Menu onClick={this.handleClick}>
              <Menu.Item key="1"><Icon type="user" />账号设置</Menu.Item>
              <Menu.Item key="2" ><Icon type="logout" />退出</Menu.Item>
            </Menu>
        );

        let btn;
        if (account === undefined){
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
        account:state.account
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        logout:()=>dispatch(logoutAction),
        getLoginInfo:()=>dispatch(getLoginInfoAction)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)