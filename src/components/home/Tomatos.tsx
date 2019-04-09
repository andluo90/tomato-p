import * as React from 'react'

import {Button,Icon,Modal,Input} from 'antd'

import axios from '../../config/axios'

import './Tomatos.scss'

import Countdown from './Countdown'

const confirm = Modal.confirm;


interface IState {
    status:number;
    description:string
    duration:number
    id:number|null
}


class Tomatos extends React.Component<{},IState>{
    constructor(props:any){
        super(props)
        this.state = {
            status:0,
            description:'',
            duration:30,
            id:null
        }
        this.showConfirm = this.showConfirm.bind(this)
        this.finish = this.finish.bind(this)
    }



    async start(){
        console.log('开始计时...')
        this.setState({
            status:1
        })
        try{
            const res = await axios.post('tomatoes',{duration:180})
            console.log(res)
            console.log(`id is ${res.data.resource.id}`)
            this.setState({
                id:res.data.resource.id
            })

        }catch(error){
            console.log(`add tomato error`)
            this.setState({
                status:0,
                id:null
            })
        }
        
    }

    finish(){
        console.log(`完成一个番茄土豆..`)
        this.setState({
            status:2
        })
    }

    showConfirm() {
        confirm({
          title:'您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
          onOk:()=> {
            console.log('中断一个番茄土豆...');
            document.title = `*番茄土豆`
            const {id} = this.state
            this.setState({
                status:0,
                id:null
            })
            axios.put(`tomatoes/${id}`,{
                aborted:true
            }).then((res)=>{
                console.log('更新tomato成功.')
                console.log(res)
            }).catch((error)=>{
                console.log('更新tomato报错.')
            })
          },
          onCancel:()=> {
            console.log('Cancel');
          },
        });
      }

    changeInput(e:any){
        this.setState({
            description:e.target.value
        })
    }
    
    async enterInput(e:any){
        console.log('更新tomato成功.')
        this.setState({
            status:0,
            description :'',
            id:null
        })
        try {
            const rep = await axios.put(`tomatoes/${this.state.id}`,{
                description:e.target.value,
                end_at:new Date()
            })
            console.log('更新tomato成功.')
            console.log(rep)
        } catch (error) {
            console.log('更新tomato报错.')
            
        }
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
            component = (<Countdown 
                            showConfirm={this.showConfirm} 
                            finish = {this.finish}
                            duration = {this.state.duration}
                        />)
        }else{
            component = (
                <div className='inputWrapper'>
                    <Input placeholder='您上次做了什么?' 
                        size='large' 
                        onChange={(e)=>this.changeInput(e)} 
                        onPressEnter={(e)=>{this.enterInput(e)}}
                        suffix={<Icon type='enter' onClick={(e)=>this.enterInput(e)} />}
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