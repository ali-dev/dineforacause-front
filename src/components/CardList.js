import React from 'react';
import Card from './Card';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const CardList = ({ causes }) => {
  return (
    <div>
      {/*<Router>*/}   
      {
        causes.map((cause, i) => {
          return (
            <Card
              key={i}
              id={causes[i].id}
              organizationId={causes[i].organizationId}
              organizationName={causes[i].organizationName}
              causeName={causes[i].causeName}
              country={causes[i].country}
              image={causes[i].image}
              
              />
          );
        })
      }
      {/*<Route path="/event/create/:organizationId/:id" component={Event}/> 
          
      </Router>*/}
    </div>
  );
}

export default CardList;