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
  );
}

export default CardList;