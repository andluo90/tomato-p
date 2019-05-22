import * as React from 'react'

import {Icon,DatePicker,Input,Pagination} from 'antd'

import moment from 'moment';

import _ from 'lodash'
import {format} from 'date-fns'

import './taskHistory.scss'


const {RangePicker} = DatePicker;
const Search = Input.Search

interface IProps {
    todos:any[]
}

interface IState {
    activeTab:number
    activeSearch:boolean
    searchKey:string
}

class TaskHistory extends React.Component<IProps,IState>{
    // 任务历史统计详情组件

    constructor(props:any){
        super(props)
        this.state = {
            activeTab:0,
            activeSearch:false,
            searchKey:''
        }
    }

    get completedTodos(){
        // 获取已完成的任务列表,并且把时间格式化一下
        const {activeTab,searchKey} = this.state
        let tmp = null;
        if(activeTab === 0){
            tmp = this.props.todos.filter((i)=>{
                if(!i.deleted && i.completed && i.description.search(searchKey)>=0){
                    return i;
                }
            })
            
        }else{
            tmp = this.props.todos.filter((i)=>{
                if(i.deleted && i.completed && i.description.search(searchKey)>=0){
                    return i;
                }
            })
            
        }
        

        return tmp.map((i)=>{
            return {
                ...i,
                completed_day:format(i.completed_at,'MM-DD'),
                completed_time:format(i.completed_at,'HH:mm'),
                deleted_day:format(i.updated_at,'MM-DD'),
                deleted_time:format(i.updated_at,'HH:mm')
            }
        })
    }

    get TodoComponents(){
        // 获取已完成但未删除的任务列表组件
        const tmp:any =  _.groupBy(this.completedTodos,'completed_day')
        const keys = Object.keys(tmp)
        keys.sort((a,b)=>new Date(b).getTime() - new Date(a).getTime() )
        const tmp2 = keys.map((i:any)=>{
            return (<li key={i}>
                <div className="left">
                    <div>{i} 
                        <span className='day'>周X</span>
                    </div>
                    <div className='count'>完成了 {tmp[i].length} 个任务</div>
                </div>
                <div className="right">
                    <ul className='list'>
                        {tmp[i].map((j:any)=>{
                            return (<li key={j.id} className='list-item'>
                                <div>
                                    <span className='time'>{j.completed_time}</span>
                                    {j.description}
                                </div>
                            </li>)
                        })}
                        
                    </ul>
                </div>
            </li>)
        })
        return tmp2
    }

    

    onChange(date:any, dateString:any){
        console.log(date, dateString)
    }

    clickTab(index:number){
        // 点击 已完成任务/已删除任务
        this.setState({
            activeTab:index
        })
    }

    toggleSearchCSS(){
        // 
        this.setState({
            activeSearch:true
        })
    }

    search(value:string){
        if(value !== this.state.searchKey){
            console.log(`开始搜索 ${value}`)
            this.setState({
                searchKey:value
            })
        }
        
    }


    render(){
        const {activeTab,activeSearch} =  this.state

        const searchComponent = activeSearch ? <Search className='search-input'  onSearch={value => this.search(value)}  /> : <Icon className='search' type="search" onClick={()=>this.toggleSearchCSS()}/>
        
        return (
            <div id='taskHistory'>
                <div className='head'>
                    <div className='left-btn'>
                        <div className={activeTab === 0 ? 'completed btn active':'completed btn'} onClick={()=>this.clickTab(0)}>已完成的任务</div>
                        <div className={activeTab === 1 ? 'deleted btn active':'deleted btn' } onClick={()=>{this.clickTab(1)}}>已删除的任务</div>
                        {searchComponent}
                    </div>
                    <div className='right-btn'>
                        <RangePicker size='large' 
                            format='YYYY-MM-DD' 
                            onChange={this.onChange}
                            placeholder={['开始日期','结束日期']}
                            defaultValue={[moment('2019-04-01','YYYY-MM-DD'),moment('2019-05-01','YYYY-MM-DD')]}
                         />
                    </div>
                    
                </div>

                <div className='main'>
                     <ul>
                        {this.TodoComponents.map((item)=>{
                            return item;
                        })}
                        
                    </ul> 
                </div>
                <Pagination defaultCurrent={1} defaultPageSize={2} total={this.completedTodos.length} hideOnSinglePage={true} />

            </div>
        )
    }
}

export default TaskHistory