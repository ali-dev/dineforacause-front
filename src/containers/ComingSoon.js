import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestCauses } from '../actions';
import './App.css';
import Header from '../components/Header'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'



class ComingSoon extends Component {
  render() {
  	// const { causes, searchField, onSearchChange } = this.props;

    
    return (
    
    <div className="App">
      <header className="App-header">
        <Header />
                
      </header>
      <h1>COMING SOON</h1>
    </div>
    
  	);
  }
}



// action done from mapDispatchToProps will channge state from mapStateToProps
export default ComingSoon;
