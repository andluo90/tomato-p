import * as React from 'react'

import {Checkbox,Icon} from 'antd'

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
    
}



class TodoItem extends React.Component<IProps,IState>{

    constructor(props:any){
        super(props)
        this.state = {
            description:this.props.item.description,
        }
    }

    change(e:CheckboxChangeEvent){
        console.log(`checked = ${e.target.checked}`)
    }

    handleClick = (e:React.MouseEvent)=>{
        this.updateTodo()
    }

    handleDoubleClick(){
        if(this.props.IsEditing !== true){
            this.props.updataEditingId(this.props.item.id)
        }
    }

    delete(e:React.MouseEvent){
        console.log('to be done...')
    }

    onInputChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            description:e.target.value
        })
    }

    keyUp = (e:any)=>{
        
        if( e.keyCode === 13 ){
            this.updateTodo()
        }
    }

    updateTodo = ()=>{
        axios.put(`todos/${this.props.item.id}`,{...this.props.item,description:this.state.description})
        .then((res)=>{
            console.log(res)
            this.props.updataEditingId(-1)
        })
        .catch((error)=>{
            console.log('put error...')
            console.log(error)
        })
    }

    render(){
        const itemClassName = `item ${this.props.IsEditing?'editing':''}`
        const item = (
            <div className={itemClassName} onDoubleClick={()=>{this.handleDoubleClick()}}>
                <div>
                    <Checkbox onChange={(e:CheckboxChangeEvent)=>this.change(e)} />
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