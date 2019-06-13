import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestCauses } from '../actions';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
// import './App.css';
import Header from '../components/Header'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Event from './Event'



// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchCauses.searchField,
    causes: state.requestCauses.causes,
    isPending: state.requestCauses.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestCauses: () => dispatch(requestCauses())
  }
}


class App extends Component {
  componentDidMount() {
    this.props.onRequestCauses();
  }

  render() {
  	const { causes, searchField, onSearchChange, isPending } = this.props;
    const filteredCauses = causes.filter(cause => {
      return cause.details.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
    
    <div className="App">
      <header className="App-header">
        <Header />
                
      </header>
      <SearchBox searchChange={onSearchChange}/>
      <CardList causes={filteredCauses} />
      
    </div>
    
  	);
  }
}



// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App)
