import React from 'react';
import 'tachyons';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <article data-name="article-full-bleed-background">

      <div className="cf Header-image" >
        <nav class="dt w-100  center bg-white o-90 mt0"> 
            <div className=" v-mid tr pa3 ">
              <a className="f8 fw6 hover-red  no-underline gray dn dib-ns pv2 ph3" href="/" >How it Works</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Causes</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Organizations</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Partners</a>
              <a className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
            </div>
          </nav>  
        <div className="fl pa3 pa4-ns black-70 measure-narrow f3 times">
          <header className="bb b--black-70 pv4 bg-white">
            <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 avenir ml2 mr2">Dine for a Cause</h3>
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
