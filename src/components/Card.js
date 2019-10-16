import React from 'react';
/*br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5*/
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
const Card = ({ causeName, id, organizationId, organizationName, details, country, image }) => {
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link className="f7 fw6 db red link dim dib v-btm" to={`/event/create/${organizationId}/${id}`}>
        <img src={`https://dfac-main.s3.amazonaws.com/app/${image}`} alt="Frank Ocean Blonde Album Cover" class="w-100 db outline black-10"/>
      </Link>
        <dl className="mt2 f6 lh-copy tc">
          <dt className="clip">Title</dt>
          <dd className="ml0 black truncate w-100">{causeName}</dd>
          <dt className="clip">{causeName}</dt>
          <dd className="ml0 gray truncate w-100">{organizationName}</dd>
          <dt>
            <Link className="f7 fw6 db red link dim dib v-btm" to={`/event/create/${organizationId}/${id}`}>Create Event</Link>
          </dt>
          
        </dl>
      
    </div>
    /*
    <div style={{width:200, height:300}} className="dib fl w-20">
    <img style={{width:200}}  alt='causes' src={`https://dfac-main.s3.amazonaws.com/app/${image}`}  className="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
    <div className="pa2 ph3-ns pb3-ns">
      <div className="dt w-100 mt1">
        <div className="dtc">
          <h1 className="f7 f7-ns mv0">{causeName}</h1> 
          <h2 className="f7 f7-ns mv0">{organizationName}</h2> 
          <p >
          
          Create event</Link>
          </p>
          
        </div>
          <div className="dtc tr">
            <h2 className="f7 mv0 normal">{country}</h2>
          </div>   

        </div>
     
      
      </div>
    </div>*/   
  );
}


export default Card;