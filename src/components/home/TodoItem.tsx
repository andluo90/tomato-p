import * as React from 'react'

import {Checkbox,Icon,message} from 'antd'

import axios from '../../config/axios'

import './TodoItem.scss'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps {
    item:any
    IsEditing:boolean
    updataEditingId:any
    
}

interface IState {
    description:string
    checked:boolean
    deleted:boolean
    
}



class TodoItem extends React.Component<IProps,IState>{

    constructor(props:any){
        super(props)
        this.state = {
            description:this.props.item.description,
            checked:this.props.item.completed,
            deleted:this.props.item.deleted
        }
    }

    check = (e:CheckboxChangeEvent)=>{
        console.log(`checked = ${e.target.checked}`)
        if(e.target.checked){
            this.setState({
                checked:true
            })
            this.updateTodo({completed:true})
        }

    }

    handleClick = (e:React.MouseEvent)=>{
        message.info('更新任务成功!',2)
        this.updateTodo({})
    }

    handleDoubleClick(){
        if(this.props.IsEditing !== true){
            this.props.updataEditingId(this.props.item.id)
        }
    }

    delete = (e:React.MouseEvent)=>{
        this.setState({deleted:true})
        this.updateTodo({deleted:true})
    }

    onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            description:e.target.value
        })
    }

    keyUp = (e:any)=>{
        
        if( e.keyCode === 13 ){
            message.info('更新任务成功!',2)
            this.updateTodo({description:this.state.description})
        }
    }

    updateTodo = (propety:object)=>{

        this.props.updataEditingId(-1)
        axios.put(`todos/${this.props.item.id}`,{...this.props.item,...propety})
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log('put error...')
            console.log(error)
        })
    }

    render(){
        const itemClassName = `item ${this.props.IsEditing?'editing':''} ${this.state.deleted?'deleted':''}`
        const item = (
            <div className={itemClassName} onDoubleClick={()=>{this.handleDoubleClick()}}>
                <div className='left'>
                    <Checkbox disabled={this.state.deleted} checked={this.state.checked} onChange={(e:CheckboxChangeEvent)=>{this.check(e)}} />
                    {this.props.IsEditing?(<input className='input' value={this.state.description}  onKeyUp={(e:any)=>this.keyUp(e)} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{this.onInputChange(e)}} />):(<span >{this.state.description}</span>)}
                </div>
                <div>
                    <Icon className='enter' type='enter' onClick={(e:React.MouseEvent)=>this.handleClick(e)} />
                    <Icon type="delete" onClick={(e:React.MouseEvent)=>this.delete(e)} />
                </div>
            </div>
        )
        
        return item;
    }
}

export {TodoItem}