import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCards } from '../../redux/weather-selector';
import WeekCardsComponent from './WeekCardsComponent';

class WeekCardsContainer extends React.Component{
    componentDidMount(){
        console.log('DidUpdate');
    }
    PreparingCards(){

    }
    render(){
        if(this.props.initialized===true)
        return(<>
        <WeekCardsComponent cards={this.props.cards}/>
        </>)
        else
        return(<div></div>)
    }
}
let mapStateToProps=(state)=>({
    initialized:state.weatherPage.Initialized,
    cards:getCards(state)
})

export default connect(mapStateToProps,{getCards})(WeekCardsContainer)