import * as React from 'react'

import {Icon,DatePicker,Input,Pagination} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment';

import _ from 'lodash'
import {format,subMonths,isWithinRange,addDays} from 'date-fns'

import * as locale2 from 'date-fns/locale/zh_cn'

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
    currentPage:number
    pageSize:number
    today:string
    aMonthAgo:string
}

class TaskHistory extends React.Component<IProps,IState>{
    // 任务历史统计详情组件

    constructor(props:any){
        super(props)
        this.state = {
            activeTab:0,
            activeSearch:false,
            searchKey:'',
            currentPage:1,
            pageSize:5,
            today:format(new Date(),'YYYY-MM-DD'),
            aMonthAgo:format(subMonths(new Date(),1),'YYYY-MM-DD')
        }
    }

    get completedTodos():any[]{
        // 获取已完成的任务列表,并且把时间格式化一下
        const {activeTab,searchKey,currentPage,pageSize,today,aMonthAgo} = this.state
        const {todos} = this.props
        let tmp = null;
        

        // 过滤已完成或已删除的数据
        if(activeTab === 0){
            tmp = todos.filter((i)=>{
                if(!i.deleted && i.completed && i.description.search(searchKey)>=0){
                    // 根据时间过滤数据
                    if (isWithinRange(i.completed_at,aMonthAgo,addDays(today,1))){
                        return i
                    }
                }
            })
            
        }else{
            tmp = todos.filter((i)=>{
                if(i.deleted && i.description.search(searchKey)>=0){
                    // 根据时间过滤数据
                    if (isWithinRange(i.updated_at,aMonthAgo,addDays(today,1))){
                        return i
                    }
                }
            })
            
        }

        
        

        // 根据页数获取对应的数据
        const totalCount = tmp.length
        tmp.sort((a,b)=>new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
        tmp = tmp.splice((currentPage-1)*pageSize,pageSize)

        const tmp2 =  tmp.map((i)=>{
            return {
                ...i,
                completed_day:format(i.completed_at,'YYYY-MM-DD'),
                completed_time:format(i.completed_at,'HH:mm'),
                deleted_day:format(i.updated_at,'YYYY-MM-DD'),
                deleted_time:format(i.updated_at,'HH:mm')
            }
        })
        return [tmp2,totalCount]
    }

    get TodoComponents(){
        // 获取已完成/已删除的任务列表组件
        let tmp:any = null
        const {activeTab} = this.state
        let desc:string = ''
        if(activeTab === 0){
            tmp =  _.groupBy(this.completedTodos[0],'completed_day')
            desc = '完成'
        }else {
            tmp =  _.groupBy(this.completedTodos[0],'deleted_day')
            desc = '删除'
        }
        const keys = Object.keys(tmp)
        keys.sort((a,b)=>new Date(b).getTime() - new Date(a).getTime() )
        const tmp2 = keys.map((i:any)=>{
            return (<li key={i}>
                <div className="left">
                    <div>{format(i,'MM-DD')} 
                        <span className='day'>{format(i,'dddd',{locale:locale2})}</span>
                    </div>
                    <div className='count'>{`${desc}了${tmp[i].length} 个任务`}</div>
                </div>
                <div className="right">
                    <ul className='list'>
                        {tmp[i].map((j:any)=>{
                            return (<li key={j.id} className='list-item'>
                                <div>
                                    <span className='time'>{activeTab === 0?j.completed_time:j.deleted_time}</span>
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

    

    changeDate(date:any, dateString:any){
        // 选择日期
        this.setState({
            aMonthAgo:dateString[0],
            today:dateString[1]
        })
    }

    clickTab(index:number){
        // 点击 已完成任务/已删除任务
        this.setState({
            activeTab:index,
            currentPage:1
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

    

    changePage(page:number){
        this.setState({
            currentPage:page
        })
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
                        <RangePicker 
                            format='YYYY-MM-DD' 
                            allowClear={false}
                            onChange={(date,dateString)=>this.changeDate(date,dateString)}
                            locale={locale}
                            defaultValue={[moment(this.state.aMonthAgo,'YYYY-MM-DD'),moment(this.state.today,'YYYY-MM-DD')]}
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
                <Pagination 
                    current = {this.state.currentPage}
                    defaultPageSize={this.state.pageSize} 
                    total={this.completedTodos[1]} 
                    hideOnSinglePage={true} 
                    onChange={(page)=>{this.changePage(page)}}
                />

            </div>
        )
    }
}

export default TaskHistory