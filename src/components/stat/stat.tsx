import * as React from 'react'

// import axios from '../../config/axios'

import {connect} from 'react-redux'

import './stat.scss'

interface IProps {
    todos:any[]
    tomatos:any[]
}

interface IState {
    activeState:any
}

// 统计组件

class Stat extends React.Component<IProps,IState>{
    constructor(props:any){
        super(props)
        this.state = {
            activeState : ['','','','']
        }
    }

    get completedTodo(){
        // 累计完成历史
        return this.props.todos.filter(i => !i.deleted && i.completed )
    }

    get todayTodos(){
        // 今日完成历史
        const today = new Date().setHours(0,0,0,0)
        return this.completedTodo.filter((i)=>{
            return new Date(i.completed_at).getTime() > today
        })
    }

    get weekTodos(){
        // 一周完成历史
        const week = new Date().getTime() -  7*24*60*60*1000
        return this.completedTodo.filter((i)=>{
            return new Date(i.completed_at).getTime() > week
        })
    }
    

    get CompletedTomatos(){
        return this.props.tomatos.filter(i => !i.aborted && !!i.ended_at )
        
    }

    click(index:number){
        const tmp = ['','','','']
        tmp[index] = 'active'
        this.setState({
            activeState:tmp
        })
        
    }
    
    render(){
        const {activeState} = this.state
        return (
            <ul id='stat'>
                <li className={activeState[0]} onClick={()=>this.click(0)}>
                    <div className='title'>统计</div>
                    <div className='title2'>一周累计</div>
                    <div className='count'>{this.weekTodos.length}</div>
                </li>
                <li className={activeState[1]} onClick={()=>this.click(1)}>
                    <div className='title'>目标</div>
                    <div className='title2'>今日目标</div>
                    <div className='count'>{this.todayTodos.length}/8</div>
                </li>
                <li className={activeState[2]} onClick={()=>this.click(2)}>
                    <div className='title'>番茄历史</div>
                    <div className='title2'>累计完成番茄</div>
                    <div className='count'>{this.CompletedTomatos.length}</div>
                </li>
                <li className={activeState[3]} onClick={()=>this.click(3)}>
                    <div className='title'>任务历史</div>
                    <div className='title2'>累计完成历史</div>
                    <div className='count'>
                        {this.completedTodo.length}
                        
                    </div>
                    <svg>
                        <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)" stroke-width="1" points="0,97 40,75 80,70 120,55 160,40 228,0 228,97"/>
                    </svg>
                </li>
            </ul>
        )
        
    }
}

function mapStateToProps(state:any){
    return {
        todos:state.home.todos,
        tomatos:state.tomatos.tomatoList
    }
}

function mapDispatchToProps(dispatch:any){
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Stat)