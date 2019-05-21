import * as React from 'react'

import {Button,Icon,Modal,Input,message} from 'antd'
import {format} from 'date-fns'

import {groupBy} from 'lodash'

import axios from '../../config/axios'


import './Tomatos.scss'

import Countdown from './Countdown'
import TomatoItem from './TomatoItem'

import {connect} from  'react-redux'




const confirm = Modal.confirm;


interface IState {
    status:number;
    description:string
    duration:number
    id:number|null
    started_at:string|null
}

interface IProps {
    tomatoList:any[]
    updateTomatoList:any;
}

// 番茄列表组件

class Tomatos extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state = {
            status:0,
            description:'',
            duration:60*30,
            id:null,
            started_at:null
        }
        this.showConfirm = this.showConfirm.bind(this)
        this.finish = this.finish.bind(this)
    }

    async componentDidMount(){
        try {
            const req = await axios.get('tomatoes')
            console.log(`获取tomato list 成功.`)
            console.log(req)
            this.props.updateTomatoList(req.data.resources)
            
        } catch (error) {
            console.log(`获取tomato list 失败.`)
            console.log(error)
            
        }
    }

    get finishedList(){
        // 获取完成的tomato list
        return this.props.tomatoList.filter((i:any)=> i.ended_at && !i.aborted)
    }

    get formatList(){
        return this.finishedList.map((i:any)=>{
            return {...i,
                    'date':format(i.ended_at,'MM-DD'),
                    'started_at':format(i.started_at,'HH:mm'),
                    'ended_at':format(i.ended_at,'HH:mm')
                   }
        })
    }

    get groupByList(){
        
        return groupBy(this.formatList,'date')
        
    }

    async start(){
        // 开始计时
        console.log('开始计时...')
        this.setState({
            status:1,
            started_at:new Date().toISOString()
            
        })
        try{
            const res = await axios.post('tomatoes',{duration:180})
            console.log(res)
            console.log(`id is ${res.data.resource.id}`)
            this.setState({
                id:res.data.resource.id,
                started_at:res.data.resource.started_at
            })

        }catch(error){
            console.log(`add tomato error`)
            this.setState({
                status:0,
                id:null,
                started_at:null
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
        if(e.target.value === ''){
            message.warning('任务名不能为空.',2)

        }else {
            const {id,description,started_at} = this.state
            const newTomatos = [...this.props.tomatoList,{id,description,started_at,aborted:null,ended_at:new Date().toISOString()}]
            
            this.props.updateTomatoList(newTomatos)
            
            try {
                const rep = await axios.put(`tomatoes/${this.state.id}`,{
                    description:e.target.value,
                    end_at:new Date()
                })
                message.success('更新任务成功.',2)

                console.log(rep)
            } catch (error) {
                console.log('更新tomato报错.')
                
            }
        }

    }
    
    

    render(){
        console.log(`render....`)
        const obj = this.groupByList
        const keys = Object.keys(obj)
        keys.sort((a,b)=>new Date(b).getTime() - new Date(a).getTime())
        let component = null

        const {status} = this.state
        
        if(status === 0){
            component = (
                <Button id='startBtn' size='large' onClick={()=>{this.start()}}>
                    <span>开始番茄</span>
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
                <div className='tomatoWrapper'>
                    {component}
                </div>
                {keys.map((key:string)=>{
                    return (
                        <TomatoItem key={key} date={key} data={obj[key]} />
                    )
                })}

            </div>
            
        )
    }
}

function mapStateToProps(state:any){
    return {
        tomatoList:state.tomatos.tomatoList
    }
}

function mapDispathToProps(dispatch:any){
    return {
        updateTomatoList:(newList:any)=> dispatch({type:'updateTomatoList',payload:newList})
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Tomatos)