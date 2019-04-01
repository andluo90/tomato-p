import * as React from 'react'

import {Checkbox,Icon,message} from 'antd'

import axios from '../../config/axios'

import {setEditingIdAction,updateTodoAction} from '../../redux/actions'

import {connect} from 'react-redux'

import './TodoItem.scss'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps {
    id:number
    IsEditing:boolean
    description:string
    checked:boolean
    deleted:boolean
    setEditingId:any
    updateTodo:any
    
}




class TodoItem extends React.Component<IProps,{}>{

    private textInput:React.RefObject<HTMLInputElement>

    constructor(props:any){
        super(props)
        this.textInput = React.createRef();
        
    }

    

    componentDidUpdate(){
        // input输入框自动focus
        if(this.textInput.current !== null){
            this.textInput.current.focus();
        }
    }


    check = (e:CheckboxChangeEvent)=>{
        if(e.target.checked){
            this.update({id:this.props.id,completed:true})
        }   

    }

    handleClick = (e:React.MouseEvent)=>{
        message.info('更新任务成功!',2)
        const {id,description,checked,deleted} = this.props
        this.update({id,description,checked,deleted})
    }

    handleDoubleClick(){
        if(this.props.IsEditing !== true){
            this.props.setEditingId(this.props.id)
        }
    }

    delete = (e:React.MouseEvent)=>{
        message.info('删除任务成功！',2)
        this.update({id:this.props.id,deleted:true})
    }

    onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        const {id,checked,deleted} = this.props
        console.log(`input change....${e.target.value}`)
        this.props.updateTodo({id,description:e.target.value,checked,deleted})

    }

    keyUp = (e:any)=>{
        
        if( e.keyCode === 13 ){
            message.info('更新任务成功!',2)
            this.update({id:this.props.id,description:this.props.description})
        }
    }

    update = (item:any)=>{
        const {description,checked,deleted} = item
        
        this.props.setEditingId(-1)
        this.props.updateTodo(item)
        axios.put(`todos/${this.props.id}`,{description,checked,deleted})
        .then((res)=>{
            console.log('update todo success.')
        })
        .catch((error)=>{
            console.log('put error...')
            console.log(error)
        })
    }

    handleEsc(e:React.KeyboardEvent<HTMLDivElement>){
        if(this.props.IsEditing && e.keyCode === 27){
            this.props.setEditingId(-1)
        }
    }

    render(){
        if(this.props.deleted || this.props.checked){
            return ''
        }
        let leftElement = null
        let rightElement = null
        if(this.props.IsEditing){
            leftElement = (
                <div className='left'>
                    <Checkbox checked={this.props.checked} onChange={(e:CheckboxChangeEvent)=>{this.check(e)}} />
                    <input className='input' ref={this.textInput} value={this.props.description}  onKeyUp={(e:any)=>this.keyUp(e)} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{this.onInputChange(e)}} />
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
                    <Checkbox checked={this.props.checked} onChange={(e:CheckboxChangeEvent)=>{this.check(e)}} />
                    <span >{this.props.description}</span>
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

function mapStateToProps(state:any){
    return {
        
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        updateTodo:(todo:object)=> dispatch(updateTodoAction(todo)),
        setEditingId:(id:number)=>dispatch(setEditingIdAction(id))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoItem)