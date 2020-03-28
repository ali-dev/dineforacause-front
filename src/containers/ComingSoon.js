import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { setSearchField, requestCauses } from '../actions';
// import './App.css';
// import Header from '../components/Header'
// import CardList from '../components/CardList'
// import SearchBox from '../components/SearchBox'



class ComingSoon extends Component {
  render() {
  	// const { causes, searchField, onSearchChange } = this.props;

    
    return (
    
    <div className="vh-100 dt w-100 coming-soon-image   ">
      {/* <header className="App-header">
                
      </header> */}
      <div className="dtc  v-mid o-90">
        <div className="fl w-20"></div>
        <div className="fr w-60 bg-white center  pa4 h5 "><h1>COMING SOON</h1></div>
        <div className="fr w-20 bg-white center pa4  h5"> 
          <img src='../assets/cause_cuisine_logo.png' width="300px" />
          {/* <div className="logo-coming-soon">&nbsp;</div> */}
          
        </div>
        
      </div>
    </div>
    
  	);
  }
}



// action done from mapDispatchToProps will channge state from mapStateToProps
export default ComingSoon;
