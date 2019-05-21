import * as React from 'react'

// import axios from '../../config/axios'

import {connect} from 'react-redux'

import './stat.scss'



class Stat extends React.Component{
    constructor(props:any){
        super(props)
    }
    
    render(){
        return (
            <ul id='stat'>
                <li>
                    <div className='title'>统计</div>
                    <div className='title2'>一周累计</div>
                    <div className='count'>0</div>
                </li>
                <li>
                    <div className='title'>目标</div>
                    <div className='title2'>今日目标</div>
                    <div className='count'>0</div>
                </li>
                <li>
                    <div className='title'>番茄历史</div>
                    <div className='title2'>累计完成番茄</div>
                    <div className='count'>0</div>
                </li>
                <li>
                    <div className='title'>任务历史</div>
                    <div className='title2'>累计完成历史</div>
                    <div className='count'>0</div>
                </li>
            </ul>
        )
        
    }
}

function mapStateToProps(state:any){
    return {

    }
}

function mapDispatchToProps(dispatch:any){
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Stat)