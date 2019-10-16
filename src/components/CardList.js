import React from 'react';
import Card from './Card';
import {BrowserRouter as Router, Route} from 'react-router-dom';
const CardList = ({ causes }) => {
  return (
    <article>
      <h2 class="f3 fw4 pa3 mv0">Causes</h2>
      <div class="cf pa2">
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
    </div>
    </article>
  );
}

export default CardList;