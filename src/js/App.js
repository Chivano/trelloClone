import React from 'react'
import ReactDOM from 'react-dom'
import CardContainer from './CardContainer'
import Card from './Card'


const style = {
    display:"flex",
    flexDirection : "row"
}

const header = {
    display:"flex",
    flexDirection : "row"
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
            text : [],
            activeCardContainer : "toDo"
        }
        
    }

    getCardsContainer (cardId){
        if(this.state.inProgress.indexOf(cardId)!= -1){
            return "inProgress"
        }
        else if(this.state.toDo.indexOf(cardId) != -1){
            return "toDo"
        }
        else if(this.state.finished.indexOf(cardId) != -1) {
            return "finished"
        }
        else {
            return "toDo"
        }
    }

    setCardActive (cardClicked) {
        var cardContainer = this.getCardsContainer(cardClicked.props.id)

        if(cardClicked.props.activeId != null){
            this.setState(()=>{
                return {
                    activeCard : null,
                    activeCardContainer : cardContainer
                }
            })
        }
        else {
            this.setState(()=>{
                return {activeCard : cardClicked.props.id, activeCardContainer : cardContainer}
            })
        }
        
    }

    setText (changedText,id) {
            
        var textToChange = this.state.text[id];
            var textArray = this.state.text;
            textArray[id] = changedText 

            this.setState((prevState)=>{
                return {text :textArray}
            });

       
    }

    addCard () {
        this.setState((prevState) => {
            return {
                toDo : prevState.toDo.length != 0 ? prevState.toDo.concat(prevState.toDo[prevState.toDo.length -1]+1) : prevState.toDo.concat(0),
                text : prevState.text.concat("")
            }
        });
    }

    moveCard (clickedCardContainer) {

        var indexOfElement = this.state[this.state.activeCardContainer].indexOf(this.state.activeCard) 

        if(indexOfElement == -1){
            return
        }

        var activeCardContainerName = this.state.activeCardContainer;
        var activeArray = this.state[activeCardContainerName];
        activeArray.splice(indexOfElement,1)
        
        this.setState((prevState)=>{
            return {[prevState.activeCardContainer] : activeArray}
        })
        
        
        var id = clickedCardContainer.props.id;

        switch(id){
            case "toDo" : {
                this.setState((prevState)=>{
                    return{
                        toDo : prevState.toDo.concat(prevState.activeCard),   
                        activeCardContainer : "toDo"
                    }
                });
            }
            break;
            case "inProgress" : {
                this.setState((prevState)=>{
                    return{
                        inProgress : prevState.inProgress.concat(prevState.activeCard),
                        activeCardContainer : "inProgress"
                    }
                },function(){
                    console.log(this.state,"thisstateafterupdate")
                })
            }
            break;
            case "finished" : {
            this.setState((prevState)=>{
                return{
                    finished : prevState.finished.concat(prevState.activeCard),
                    activeCardContainer : "finished"
                }
            })
            break;
            }
        }
    }

    deleteCard () {

       var updatedArray = this.state[this.state.activeCardContainer].filter((card)=>{
           return card != this.state.activeCard 
       })
       var updatedTextArray = this.state.text;
       updatedTextArray.splice(this.state.activeCard,1)


       this.setState((prevState)=>{
           return {
               [this.state.activeCardContainer]: updatedArray,
               text : updatedTextArray
        }
       })
    }

    renderCards () {
        return this.state.toDo.map((id)=> {
            return(<Card setText={this.setText.bind(this)} setCardActive={this.setCardActive.bind(this)} text={this.state.text[id]} activeId={this.state.activeCard} key={id} id={id}/>)
        })
    }

    renderInProgress () {
        return this.state.inProgress.map((id)=> {
            return(<Card setText={this.setText.bind(this)} setCardActive={this.setCardActive.bind(this)} text={this.state.text[id]} activeId={this.state.activeCard} key={id} id={id}/>)
        })
    }
    renderFinished() {
        return this.state.finished.map((id)=> {
            return(<Card setText={this.setText.bind(this)} setCardActive={this.setCardActive.bind(this)} text={this.state.text[id]} activeId={this.state.activeCard} key={id} id={id}/>)
        })
    }
 
    render () {
        return (
            <div>
                <div>
                  <div>
                      <button onClick={this.addCard.bind(this)}>Add Item</button>
                      <button onClick={this.deleteCard.bind(this)}>Delete item</button>
                  </div>
                </div>
                <div style={style}> 
                <CardContainer title="Todo" moveCard={this.moveCard.bind(this)} id="toDo">
                {this.renderCards()}  
                </CardContainer>
                <CardContainer title="In progress" moveCard={this.moveCard.bind(this)} id="inProgress">
                {this.renderInProgress()}  
                </CardContainer>
                <CardContainer title="Finished" moveCard={this.moveCard.bind(this)} id="finished">
                {this.renderFinished()} 
                </CardContainer>
                </div>
            </div>)
    }
}