import * as React from 'react'

import {Button,Icon,Modal,Input} from 'antd'

// import axios from '../../config/axios'

import './Tomatos.scss'

const confirm = Modal.confirm;


interface IState {
    status:number;
    description:string
}


class Tomatos extends React.Component<{},IState>{
    constructor(props:any){
        super(props)
        this.state = {
            status:0,
            description:'',
        }
    }



    start(){
        console.log('开始计时...')
        this.setState({
            status:1
        })
    }

    showConfirm() {
        confirm({
          title:'您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    changeInput(e:any){
        this.setState({
            description:e.target.value
        })
    }
    
    enterInput(e:any){
        console.log('enter....')
    }
    
    

    render(){

        let component = null

        const {status} = this.state
        
        if(status === 0){
            component = (
                <Button id='startBtn' size='large' onClick={()=>{this.start()}}>
                    <span>开始番茄</span>
                </Button>
            )
        }else if(status === 1){
            component = (
                <div className='progressWrapper'>
                    <span>24:13</span>
                    <div id='progress' />
                    <Icon className='abort' type="close-circle" onClick={()=>{this.showConfirm()}} />
                </div>
            )
        }else{
            component = (
                <div className='inputWrapper'>
                    <Input placeholder='您上次做了什么?' 
                        size='large' 
                        onChange={(e)=>this.changeInput(e)} 
                        onPressEnter={(e)=>{this.enterInput(e)}}
                    />
                    <Icon className='abort' type="close-circle" onClick={()=>{this.showConfirm()}} />
                </div>
            )
        }

        return (
            <div id='tomatos'>
                {component}
            </div>
        )
    }
}

export default Tomatos