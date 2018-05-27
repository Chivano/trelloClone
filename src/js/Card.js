import React from 'react'
import ReactDOM from 'react-dom'
import CardContainer from './CardContainer';

const inactive = {
    border : "solid",
    width : "80%",
    height: "10%",
    margin : "1%",
    cursor: "pointer"
}

const active = {
    border : "solid",
    borderColor : "coral",
    width : "80%",
    height: "10%",
    margin : "1%",
    cursor: "pointer"
}


export default class Card extends React.Component {

    constructor (props) {
        super(props);
        this.state={showInput : false}
    }

    setStyle () {
        if(this.props.activeId == this.props.id){
            return active
        }
        else {
            return inactive
        }
    }

    blur (e) {
        this.setState(()=>{
            return {showInput : false}
        })
        this.props.setText(e.target.value, this.props.id)

    }

    onChangeInput(e){
        e.stopPropagation()
    }

    setCardActive(e) {
        e.stopPropagation()
        this.props.setCardActive(this)
    }

    showInput () {  
        if(this.state.showInput == false){
            console.log("here")
            this.setState(()=>{
                return {showInput : true}
            })
        }
        
    }

    renderInput () {
        if(this.state.showInput){
            return <input style={{height: "100%",width : "100%"}} onBlur={(e)=>this.blur(e)} onClick={(e)=>{e.stopPropagation()}} id="input1" type="text"></input>
        }
    
    }

    render () {
        return (
            <div onDoubleClick={this.showInput.bind(this)} onClick={this.setCardActive.bind(this)} style={this.setStyle()} >{this.props.text}
            {this.renderInput()}
        </div>)
    }
}