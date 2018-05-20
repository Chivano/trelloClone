import React from 'react'
import ReactDOM from 'react-dom'
import CardContainer from './CardContainer'
import Card from './Card'


const style = {
    display:"flex",
    flexDirection : "row"
}

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

var toDo = [];
var keys = [0];
var ids = [-1]


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toDo : [],
            inProgress : [],
            finished : [],
            allowedActive : true,
            activeCard : null,
            style : "inactive",
            activeCardContainer : "toDo"
        }
        
    }


    setActive(clickedCard) {
        var activeCard;
        if(!this.state.activeCard){
            if(clickedCard.state.style == "inactive"){
                clickedCard.setState(function(x){
                    return {style : "active"}
                })
                this.setState(function(){
                    return activeCard = true
                })
            }else {
                clickedCard.setState(function(x){
                    return {style : "inactive"}
                })
            }
    
            if(this.state.inProgress.filter((card) => card.props.id == clickedCard.props.id).length > 0){
                this.setState({ 
                    activeCard : this.state.inProgress.filter((card) => card.props.id == clickedCard.props.id),
                    activeCardContainer : "inProgress",
                    allowedActive : false      
                }, () => {
                    console.log(this.state,"THISSTATE")
                    }); 
            }
            if(this.state.toDo.filter((card) => card.props.id == clickedCard.props.id).length > 0){
                console.log("HERERERE")
                this.setState({ 
                    activeCard : this.state.toDo.filter((card) => card.props.id == clickedCard.props.id),
                    activeCardContainer : "toDo",
                    allowedActive : false      
                }, () => {
                    console.log(this.state,"THISSTATE")
                    }); 
            }
            if(this.state.finished.filter((card) => card.props.id == clickedCard.props.id).length > 0){
                this.setState({ 
                    activeCard : this.state.finished.filter((card) => card.props.id == clickedCard.props.id),
                    activeCardContainer : "finished",
                    allowedActive : false      
                }, () => {
                    console.log(this.state,"THISSTATE")
                    }); 
    
            }
        }
        
    
    }

    addCard() {
        ids.push(ids[ids.length -1] + 1)
        toDo.push(<Card style={this.state.style}  id={ids[ids.length-1]} setActive={this.setActive.bind(this)}/>)
        this.setState(prevState =>({
            toDo : toDo
        }))
    }

    findIndexOfActiveCard (toDoToMove, id) {
        if(id == "toDo"){
            console.log(toDoToMove,"toDoToMove")
            return this.state.toDo.map((card)=>{
                return card.props.id
            }).indexOf(toDoToMove[0].props.id)
        }
        if(id == "inProgress"){
            return this.state.inProgress.map((card)=>{
                return card.props.id
            }).indexOf(toDoToMove[0].props.id)
        }

        if(id == "finished"){
            return this.state.finished.map((card)=>{
                return card.props.id
            }).indexOf(toDoToMove[0].props.id)
        }
       
    }

    moveCard (id){
        if(id != this.state.activeCardContainer && this.state.activeCard){
            var cardToMove = this.state.activeCard
            if(id == "inProgress"){
                this.state[this.state.activeCardContainer].splice(this.findIndexOfActiveCard(cardToMove, this.state.activeCardContainer),1)
               
                this.setState(function(prevState, props) { 
                    return {
                        inProgress: this.state.inProgress.concat(cardToMove),
                        toDo : this.state.toDo,
                        finished : this.state.finished,
                        activeCard : null
                    };
                });
            }
            if(id == "toDo"){
                this.state[this.state.activeCardContainer].splice(this.findIndexOfActiveCard(cardToMove, this.state.activeCardContainer),1)
                this.setState(function(prevState, props) { 
                    return {
                        toDo: this.state.toDo.concat(cardToMove),
                        inProgress: this.state.inProgress,
                        finished : this.state.finished,
                        activeCard : null
                    };
                });
            }
            if(id == "finished"){
                this.state[this.state.activeCardContainer].splice(this.findIndexOfActiveCard(cardToMove, this.state.activeCardContainer),1)
                this.setState(function(prevState, props) { 
                    return {
                        toDo: this.state.toDo,
                        inProgress: this.state.inProgress,
                        finished : this.state.finished.concat(cardToMove),
                        activeCard : null
                    };
                });
            }  
        }
    }

    render () {
        return (
            <div>
                <div>
                  <div>
                      <button onClick={this.addCard.bind(this)}>Add Item</button>
                  </div>
                </div>
                <div style={style}>
                <CardContainer id="toDo" moveCard={this.moveCard.bind(this)} >
                {this.state.toDo}
                </CardContainer>
                <CardContainer id="inProgress" moveCard={this.moveCard.bind(this)}>
                {this.state.inProgress}
                </CardContainer>
                <CardContainer id="finished" moveCard={this.moveCard.bind(this)}>
                {this.state.finished}
                </CardContainer>
                </div>
            </div>)
    }
}