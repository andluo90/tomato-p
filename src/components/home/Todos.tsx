import * as React from 'react'

import {Input,Icon,message,Empty} from 'antd'

import {connect} from  'react-redux'

import {changeInput} from '../../redux/actions'

import './Todos.scss'


interface IProps {
    addTodo:any
    inputTaskName:string
    changeInputTaskName:any
}

class Todos extends React.Component<IProps,{}> {

    constructor(props:any){
        super(props)
    }

    onChange(e:React.ChangeEvent<HTMLInputElement>){
        this.props.changeInputTaskName(e.target.value)
    }

    onKeyUp(e:React.KeyboardEvent){
        // 添加新任务回车事件
        if (e.keyCode === 13){
            const {inputTaskName} = this.props
            if(inputTaskName === ''){
                message.warning('任务名不能为空!',2)
            }
            this.handleAddTodo(inputTaskName)
        }
    }

    handleClick(e:React.MouseEvent){
        // 添加新任务点击事件
        const {inputTaskName} = this.props
        if(inputTaskName === ''){
            message.warning('任务名不能为空!',2)   
        }else{
            this.handleAddTodo(inputTaskName)
        }
    }

    handleAddTodo(taskName:string){
        // 添加新任务
        this.props.addTodo(taskName)
        this.props.changeInputTaskName('')

        message.info("添加新任务成功!",2)
    }

    get dataList(){
        // 获取任务列表
        const t = this.props.children as any[]
        if( t.length !== 0){
            return this.props.children
        }else{
            return (<Empty description='暂无任务数据.' />) 
        }
    }
    

    render(){
        const { inputTaskName } = this.props;
        return (
            <div id='todos'>
                <Input size='large'
                    placeholder="添加新任务"
                    suffix = {<Icon type='enter' onClick={(e:React.MouseEvent)=>this.handleClick(e)} />}
                    value={inputTaskName}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>this.onChange(e)}
                    onKeyUp={(e:React.KeyboardEvent) =>this.onKeyUp(e)}
                />
                {/* {this.props.children} */}
                {this.dataList}
            </div>
        )
    }
}

function mapStateToProps(state:any){
    return {
        inputTaskName:state.todos.inputTaskName
    }
}

function mapDispatchToProps(dispatch:any){
    return {
        changeInputTaskName:(name:string)=>dispatch(changeInput(name))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos)
