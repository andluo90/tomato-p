import * as React from 'react'

import {Icon,DatePicker,Input,Pagination,Empty} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment';

import _ from 'lodash'
import {format,subMonths,isWithinRange,addDays} from 'date-fns'

import * as locale2 from 'date-fns/locale/zh_cn'

import './tomatoHistory.scss'


const {RangePicker} = DatePicker;
const Search = Input.Search

interface IProps {
    tomatos:any[]
}

interface IState {
    activeSearch:boolean
    searchKey:string
    currentPage:number
    pageSize:number
    today:string
    aMonthAgo:string
}

class TomatoHistory extends React.Component<IProps,IState>{
    // 任务历史统计详情组件

    constructor(props:any){
        super(props)
        this.state = {
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
        const {searchKey,currentPage,pageSize,today,aMonthAgo} = this.state
        const {tomatos} = this.props
        let tmp = null;

        // 过滤已完成的番茄
        tmp = tomatos.filter((i)=>{
            if(!i.aborted && i.ended_at && i.description && i.description.search(searchKey)>=0){
                // 根据时间过滤数据
                if (isWithinRange(i.ended_at,aMonthAgo,addDays(today,1))){
                    return i
                }
            }
        })
            

        // 根据页数获取对应的数据
        const totalCount = tmp.length
        tmp.sort((a,b)=>new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
        tmp = tmp.splice((currentPage-1)*pageSize,pageSize)

        const tmp2 =  tmp.map((i)=>{
            return {
                ...i,
                completed_day:format(i.ended_at,'YYYY-MM-DD'),
                completed_time:format(i.ended_at,'HH:mm')
                
            }
        })
        return [tmp2,totalCount]
    }

    get todoComponents(){
        // 获取已完成番茄列表组件
        
        let tmp:any = null
        tmp =  _.groupBy(this.completedTodos[0],'completed_day')
        
        const keys = Object.keys(tmp)
        keys.sort((a,b)=>new Date(b).getTime() - new Date(a).getTime() )
        const tmp2 = keys.map((i:any)=>{
            return (<li key={i}>
                <div className="left">
                    <div>{format(i,'MM-DD')} 
                        <span className='day'>{format(i,'dddd',{locale:locale2})}</span>
                    </div>
                    <div className='count'>{`完成了${tmp[i].length} 个番茄`}</div>
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

    

    changeDate(date:any, dateString:any){
        // 选择日期
        this.setState({
            aMonthAgo:dateString[0],
            today:dateString[1]
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

    get dataList(){
        // 要展示的数据列表
        const isEmpty = this.todoComponents.length === 0 ? true:false
        if(isEmpty){
            return (<Empty description='暂无番茄历史.' />)
        }else {
            return (
                <ul>
                    {this.todoComponents.map((item)=>{
                        return item;
                    })}
                </ul> )
        }
    }

    render(){
        const {activeSearch} =  this.state

        const searchComponent = activeSearch ? <Search className='search-input'  onSearch={value => this.search(value)}  /> : <Icon className='search' type="search" onClick={()=>this.toggleSearchCSS()}/>
        return (
            <div id='tomatoHistory'>
                <div className='head'>
                    <div className='left-btn'>
                        <div className={'completed btn active'} >已完成的番茄</div>
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
                    {this.dataList}
                     
                     {/* <ul>
                        {this.todoComponents.map((item)=>{
                            return item;
                        })}
                        
                    </ul>  */}
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

export default TomatoHistory