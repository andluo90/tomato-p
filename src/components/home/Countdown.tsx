import * as React from 'react'

import {Icon} from 'antd'

import './Countdown.scss'

interface IProps {
    showConfirm:()=>void
    finish:()=>void
    duration:number
}

interface IState {
    residueTime:number
}



class Countdown extends React.Component<IProps,IState>{

    static timeId:number|undefined = undefined

    constructor(props:IProps){
        super(props)
        this.state = {
            residueTime:this.props.duration,
        }
    }



    componentDidMount(){
        Countdown.timeId = window.setInterval(()=>{
            if(this.state.residueTime<=0){
                document.title = `完成 *番茄土豆`
                this.props.finish()
            }else{
                this.setState({
                    residueTime:this.state.residueTime-1
                })
                const time = this.getFormatTime(this.state.residueTime)
                document.title = `${time} *番茄土豆`
            }
            
        },1000)
        console.log(`set interval , id is ${Countdown.timeId}`)

    }

    componentWillUnmount(){
        console.log(`clear interval id ${Countdown.timeId}`)
        window.clearInterval(Countdown.timeId)
    }

    getFormatTime(seconds:number):string{
        // format seconds to mm:ss
        let mm:number|string = Math.floor(seconds/60)
        let ss:number|string = seconds - mm*60
        mm = mm < 10 ? "0"+mm : mm+''
        ss = ss < 10 ? "0"+ss : ss+''
        return `${mm}:${ss}`
    }
    
    render(){
        const {showConfirm,duration} = this.props
        const {residueTime} = this.state
        const percent = 100 - Math.floor(residueTime/duration*100)
        const time = this.getFormatTime(residueTime)
        return (
            <div className='progressWrapper'>
                <span>{time}</span>
                <div id='progress' style={ {width:`${percent}%`} } />
                <Icon className='abort' type="close-circle" onClick={()=>{showConfirm()}} />
            </div>
        )
    }
}

export default Countdown