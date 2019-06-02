import React from 'react';

import {BrowserRouter as Router, Link} from 'react-router-dom';
const Card = ({ title, body, id }) => {
  return (
    <div style={{width:200, height:300}} className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center dib">
    <img style={{width:200}}  alt='causes' src={`http://placehold.jp/200x200.png`}  className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
    <div className="pa2 ph3-ns pb3-ns">
      <div className="dt w-100 mt1">
        <div className="dtc">
          <h1 className="f7 f7-ns mv0">{title}</h1> 
          <p >
          <Link className="f7 fw6 db red link dim dib v-btm" to={`/event/create/${id}`}>Create event</Link>
          </p>
          
        </div>
          <div className="dtc tr">
            <h2 className="f7 mv0 normal">country name</h2>
          </div>   

        </div>
     
      
      </div>
    </div>   
  );
}


export default Card;