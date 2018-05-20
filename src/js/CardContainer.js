import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'


const styles = {
    border : "solid",
    width : "20%",
    height: "70%",
    margin : "1%",
    display:"flex",
    flexDirection : "column"
}


export default class CardContainer extends React.Component {

    constructor(props) {
        super(props);  
    }

    render () {
        return (
            <div onClick={()=>this.props.moveCard(this.props.id)} style={styles}>
            {this.props.children}
        </div>)
    }
}