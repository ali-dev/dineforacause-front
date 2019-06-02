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
              title={causes[i].title}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;