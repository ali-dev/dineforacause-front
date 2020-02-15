import React from 'react';
/*br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5*/
import {Link} from 'react-router-dom';
// const imgWidth = {
//   width: "200px"
// }
// const imagePath = "https://dfac-main.s3.amazonaws.com/app/";
const imagePath =  'https://dfac-main.s3.amazonaws.com/app';
const image2 = 'cause2.jpg';
const Card = ({ causeName, id, organizationId, organizationName, details, country, image }) => {
  return (
    <div className="fl w-50 w-25-m w-20-l pa2">
      <Link className="db link dim tc" to={`/event/create/${organizationId}/${id}`}>
        <img className="w-100 db outline black-10" alt={image2} src={`${imagePath}/${image2}`} />
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

       
  );
}


export default Card;