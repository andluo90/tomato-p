import * as React from 'react'

import {DatePicker,Input} from 'antd'

import moment from 'moment';

import './taskHistory.scss'


const {RangePicker} = DatePicker;
const Search = Input.Search

interface IProps {
    todos:any[]
}

class TaskHistory extends React.Component<IProps>{
    // 任务历史统计详情组件

    constructor(props:any){
        super(props)
    }

    onChange(date:any, dateString:any){
        console.log(date, dateString)
    }

    render(){
        return (
            <div id='taskHistory'>
                <div className='head'>
                    <div className='left-btn'>
                        <div className='completed btn active'>已完成的任务</div>
                        <div className='deleted btn'>已删除的任务</div>
                        {/* <Icon className='search' type="search" /> */}
                        <Search className='search-input'  onSearch={value => console.log(value)} />
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

                <div className='main' />
            </div>
        )
    }
}

export default TaskHistory