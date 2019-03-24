import * as React from 'react'

import {Link} from 'react-router-dom'

import { Menu, Dropdown, Button, Icon, message } from 'antd';


interface IProps {
    account:string
    onClickHandle:any
}

export default class Header extends React.Component<IProps>{

    menu = (
        <Menu onClick={(e)=>this.props.onClickHandle(e)}>
          <Menu.Item key="1"><Icon type="user" />账号设置</Menu.Item>
          <Menu.Item key="2"><Icon type="logout" />退出</Menu.Item>
        </Menu>
    );

    constructor(props:IProps){
        super(props)
    }

    

    onClickhandle(e:any){
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

        let btn;
        if (this.props.account === undefined){
            btn = (<Link to='/login'><Button>登录</Button></Link>)
        }else {
            btn = (
                <Dropdown overlay={this.menu}>
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