import * as React from 'react'

import './tomatoHistory.scss'

interface IProps {
    tomatos:any[]
}

class TomatoHistory extends React.Component<IProps>{
    // 番茄历史统计详情组件

    constructor(props:any){
        super(props)
    }

    render(){
        return (
            <div id='tomatoHistory'>
                test222...
            </div>
        )
    }
}

export default TomatoHistory