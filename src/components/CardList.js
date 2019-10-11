import React from 'react';
import Card from './Card';

const CardList = ({ causes }) => {
  return (
    <div>
      {
        causes.map((cause, i) => {
          return (
            <Card
              key={i}
              id={causes[i].id}
              organizationId="60790acc-8d7c-11e9-bc42-526af7764f64"
              causeName={causes[i].causeName}
              country={causes[i].country}
              image={causes[i].image}
              
              />
          );
        })
      }
    </div>
  );
}

export default CardList;