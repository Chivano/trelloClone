import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'


const componentRoot = {
    width : "20%",
    height: "70%",
    margin : "1%",
    display:"flex",
    flexDirection : "column"
}

const container = {
    width : "100%",
    margin : "1%",
    height: "70%",
    border : "solid",
}


export default class CardContainer extends React.Component {

    constructor(props) {
        super(props);  
    }

    render () {
        return (
            <div style={componentRoot}>
                <div>{this.props.title}</div>
                    <div style={container} onClick={()=>this.props.moveCard(this)} >
                    {this.props.children}
                </div>
        </div>)
    }
}