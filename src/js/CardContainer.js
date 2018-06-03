import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'


const componentRoot = {
    width : "20%",
    height: "90%",
    margin : "1%",
    display:"flex",
    flexDirection : "column"
}

const container = {
    width : "100%",
    margin : "1%",
    height: "100%",
    borderRadius : "10px",
    border : "solid",
    borderColor : "white",
}

const titleStyle = {
    textAlign : "center",
    fontWeigh : "bold",
    fontSize : "20px",
    fontFamily: "Arial"
}


export default class CardContainer extends React.Component {

    constructor(props) {
        super(props);  
    }

    render () {
        return (
            <div style={componentRoot}>
                <div style={titleStyle}>{this.props.title}</div>
                    <div style={container} onClick={()=>this.props.moveCard(this)} >
                    {this.props.children}
                </div>
        </div>)
    }
}