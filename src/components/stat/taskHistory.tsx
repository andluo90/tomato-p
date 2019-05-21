import * as React from 'react'

import './taskHistory.scss'

interface IProps {
    todos:any[]
}

class TaskHistory extends React.Component<IProps>{
    // 任务历史统计详情组件

    constructor(props:any){
        super(props)
    }

    render(){
        return (
            <div id='taskHistory'>
                test...
            </div>
        )
    }
}

export default TaskHistory