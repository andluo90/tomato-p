import * as React from  'react'

import './TomatoItem.scss'

interface IProps {
    data:any
    date:string
}

function TomatoItem(props:IProps){
    return (
        <div className='tomatoItem'>
            <div className='title'>
                <span>{props.date}</span>
                <span>完成了 {props.data.length} 个番茄</span>
            </div>
            <ul>
                {props.data.map((i:any)=>{
                    return (
                        <li key={i.id}>
                            <span>{i.started_at} - {i.ended_at}</span>
                            <span>{i.description}</span>
                        </li>
                        
                    )
                })}
                
            </ul>
        </div>
    )
}

export default TomatoItem