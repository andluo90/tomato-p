import * as React from 'react'

import {Input,Icon,message} from 'antd'

import './Todos.scss'

interface IState {
    taskName:string;
}

interface IProps {
    addTodo:any
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
        const {taskName} = this.state
        if(taskName === ''){
            message.warning('任务名不能为空!',2)   
        }else if (e.keyCode === 13){
            this.props.addTodo(taskName)
            this.setState({
                taskName:''
            })
            message.info("添加新任务成功!",2)
        }
    }

    handleClick(e:React.MouseEvent){
        const {taskName} = this.state
        if(taskName === ''){
            message.warning('任务名不能为空!',2)   
        }else{
            this.props.addTodo(taskName)
            this.setState({
                taskName:''
            })
            message.info("添加新任务成功!",2)
        }
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
            </div>
        )
    }
}

export {Todos}
