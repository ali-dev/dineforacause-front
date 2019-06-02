import React from 'react';
import 'tachyons';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <article data-name="article-full-bleed-background">
      <div className="cf Header-image" >
        <div className="fl pa3 pa4-ns black-70 measure-narrow f3 times">
          <header className="bb b--black-70 pv4 bg-white">
            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir ml2 mr2">Dine for a Cause</h3>
            <h4 className="f3 fw4 i lh-title mt0 ml2 mr2">About Us</h4>
          </header>
          <section className="pt5 pb4 bg-white o-90">
            <p className="times lh-copy measure f4 mt0 ml2 mr2">
              Dine for a cause is an initiative that combines Food and Culture with Humanitarian Assistance. 
              More details tbd More details tbdMore details tbdMore details tbdMore details tbd             
            </p>
            <p className="times lh-copy measure f4 mt0 ml2 mr2">
              Dine for a cause is an initiative that combines Food and Culture with Humanitarian Assistance. 
              More details tbd More details tbdMore details tbdMore details tbdMore details tbd             
            </p>

          </section>
        </div>
      </div>
    </article>
    </div>
  );
}

export default Header;
