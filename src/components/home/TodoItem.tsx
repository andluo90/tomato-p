import * as React from 'react'

import {Checkbox,Icon} from 'antd'

import './TodoItem.scss'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface IProps {
    description:string
}

interface IState {
    editing:boolean
}

class TodoItem extends React.Component<IProps,IState>{

    constructor(props:any){
        super(props)
        this.state = {
            editing:false
        }
    }

    change(e:CheckboxChangeEvent){
        console.log(`checked = ${e.target.checked}`)
    }

    handleClick(e:React.MouseEvent){
        console.log(`to be done...`)
    }

    handleDoubleClick(){
        console.log(`double click..`)
        this.setState({
            editing:true
        })
    }

    delete(e:React.MouseEvent){
        console.log('to be done...')
    }

    render(){
        const itemClassName = `item ${this.state.editing?'editing':''}`
        const item = (
            <div className={itemClassName}>
                <div>
                    <Checkbox onChange={(e:CheckboxChangeEvent)=>this.change(e)} />
                    {this.state.editing?(<input className='input' value={this.props.description} />):(<span onDoubleClick={()=>{this.handleDoubleClick()}}>{this.props.description}</span>)}
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