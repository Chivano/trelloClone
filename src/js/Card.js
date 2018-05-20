import React from 'react'
import ReactDOM from 'react-dom'

const inactive = {
    border : "solid",
    width : "80%",
    height: "10%",
    margin : "1%"
}

const active = {
    border : "solid",
    backgroundColor : "black",
    width : "80%",
    height: "10%",
    margin : "1%"
}


export default class Card extends React.Component {

    constructor (props) {
        super(props);
        this.state = {style : "inactive"}
    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log(nextProps," nextProps.allowedActive")
         return {style : "inactive"}
     }

    setStyle () {

    } 
    setActive (e) {
       e.stopPropagation();
       
       this.props.setActive(this)
    }


    render () {
        console.log(this.state)
        return (
            <div onClick={this.setActive.bind(this)} style={this.state.style == "inactive" ? inactive : active}>{this.props.id}
        </div>)
    }
}