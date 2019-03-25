import * as React from 'react'

import {Input,Icon,message} from 'antd'

import {TodoItem} from './TodoItem'

import './Todos.scss'

interface IState {
    taskName:string;
}

interface IProps {
    addTodo:any
    todos:object[]
}

class Todos extends React.Component<IProps,IState> {

    constructor(props:any){
        super(props)
        this.state = {
            taskName:''
        }
    }

    onChange(e:React.ChangeEvent<HTMLInputElement>){
        this.setState({
            taskName:e.target.value
        })
    }

    onKeyUp(e:React.KeyboardEvent){
        // 添加新任务回车事件
        const {taskName} = this.state
        if(taskName === ''){
            message.warning('任务名不能为空!',2)   
        }else if (e.keyCode === 13){
            this.handleAddTodo(taskName)
        }
    }

    handleClick(e:React.MouseEvent){
        // 添加新任务点击事件
        const {taskName} = this.state
        if(taskName === ''){
            message.warning('任务名不能为空!',2)   
        }else{
            this.handleAddTodo(taskName)
        }
    }

    handleAddTodo(taskName:string){
        // 添加新任务
        this.props.addTodo(taskName)
        this.setState({
            taskName:''
        })
        message.info("添加新任务成功!",2)
    }

    render(){
        const { taskName } = this.state;
        return (
            <div id='todos'>
                <Input
                    placeholder="添加新任务"
                    suffix = {<Icon type='enter' onClick={(e:React.MouseEvent)=>this.handleClick(e)} />}
                    value={taskName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>this.onChange(e)}
                    onKeyUp={(e:React.KeyboardEvent) =>this.onKeyUp(e)}
                />
                {this.props.todos.map((item:any)=>{
                    return (<TodoItem key={item.id} description={item.description} />)
                })}
            </div>
        )
    }
}

export {Todos}
