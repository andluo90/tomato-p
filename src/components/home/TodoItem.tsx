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

    private textInput:React.RefObject<HTMLInputElement>

    constructor(props:any){
        super(props)
        this.textInput = React.createRef();
        this.state = {
            description:this.props.item.description,
            checked:this.props.item.completed,
            deleted:this.props.item.deleted
        }
    }


    componentDidUpdate(){
        // input输入框自动focus
        if(this.textInput.current !== null){
            this.textInput.current.focus();
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
        message.info('删除任务成功！',2)
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

    handleEsc(e:React.KeyboardEvent<HTMLDivElement>){
        if(this.props.IsEditing && e.keyCode === 27){
            this.props.updataEditingId(-1)
        }
    }

    render(){
        if(this.state.deleted || this.state.checked){
            return ''
        }
        let leftElement = null
        let rightElement = null
        if(this.props.IsEditing){
            leftElement = (
                <div className='left'>
                    <Checkbox checked={this.state.checked} onChange={(e:CheckboxChangeEvent)=>{this.check(e)}} />
                    <input className='input' ref={this.textInput} value={this.state.description}  onKeyUp={(e:any)=>this.keyUp(e)} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{this.onInputChange(e)}} />
                </div>
            )
            rightElement = (
                <div className='right'>
                    <Icon className='enter' type='enter' onClick={(e:React.MouseEvent)=>this.handleClick(e)} />
                    <Icon type="delete" onClick={(e:React.MouseEvent)=>this.delete(e)} />
                </div>)
        }else{
            leftElement = (
                <div className='left'>
                    <Checkbox checked={this.state.checked} onChange={(e:CheckboxChangeEvent)=>{this.check(e)}} />
                    <span >{this.state.description}</span>
                </div>
            )
            rightElement = (
                <div className='right' />
            )
        }
        const itemClassName = `item ${this.props.IsEditing?'editing':''}`
        const item = (
            <div className={itemClassName} onDoubleClick={()=>{this.handleDoubleClick()}} onKeyUp={(e:React.KeyboardEvent<HTMLDivElement>)=>this.handleEsc(e)}>
                {leftElement}
                {rightElement}
            </div>
        )
        
        return item;
    }
}

export {TodoItem}