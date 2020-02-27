import React, { Component } from "react";
import {Link} from 'react-router-dom';
import '../components/Header.css';

const initialState = {
  pages: {
    about_us: "About Us",
    causes: "Contact Us",
    organizations: "Organizations",
    how_it_works: "How it Works"
  },
  image: "about-us-image",
  upperTapeClass: "dt w-100  center bg-white o-90 mt0 bt b--orange",
  createEventButtonClass: "f6 link dim br-pill ph3 pv2 mb2 dib white bg-orange"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (page, borderColor, createEventButtonClass) => {
    this.setState({'image': page+"-image"});
    this.setState({'upperTapeClass': "dt w-100  center bg-white o-90 mt0 bt "+borderColor})
    this.setState({'createEventButtonClass': "f6 link dim br-pill ph3 pv2 mb2 dib white "+createEventButtonClass})
    
  };
  signup = () => {
    alert('Not implemented yet');
  }

  render() {
    const { image, upperTapeClass, createEventButtonClass } = this.state;
    
    const slider = (
      <div>
        <header className={image} >
          <div className="vh-100 dt w-100 ">
            <article data-name="article-full-bleed-background" >
              <div className="cf ">
                <nav className={upperTapeClass}>
                  <div className=" v-mid tr pa3 ">
                    
                    <Link to="/"  onClick={() => this.handleChange('about-us', 'b--orange', 'bg-orange')} className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3">
                      About Us
                    </Link>
                    
                    <Link to="/"  onClick={() => this.handleChange('causes', 'b--green', 'bg-green')} className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3">
                      Causes
                    </Link>
                    
                    <Link to="/"  onClick={() => this.handleChange('organizations', 'b--dark-pink', 'bg-dark-pink')} className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3">
                      Organizations
                    </Link>

                    <Link to="/"  onClick={() => this.handleChange('how-it-works', 'b--blue', 'bg-blue')} className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3">
                      How it Works
                    </Link>
                    <Link to="/"  onClick={() => this.signup()} className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba">
                      Sign Up
                    </Link>
                      
                  </div>
                </nav>
                <div className="fl pa3  pa4-ns black-70 measure-narrow f3 ">
                  <header className="bb b--black-70 pv4 bg-white ">
                    <h3 className="f2 fw7 ttu tracked lh-title mt0 mb3 ml2 mr2">
                      Cause & Cuisine
                    </h3>
                  </header>

                  <section className="pt5 pb4 bg-white o-90 ">
                    <p className="lh-copy measure f5 mt0 ml2 mr2">
                    Cause & Cuisine provides the ability to create fundraising events. 
                    We are here to help support causes through partnerships with non-profit organizations, 
                    and we truly believe that social events and dinner parties are a powerful and organic way to do so.
                     We offer a flawless user experience that enables users to easily choose a cause, 
                     create events and invite guests within minutes, in addition to providing hundreds of community-driven recipes,
                      and tips on how to throw the perfect dinner party. 
                    </p>
                    

                    
                    {/* onClick={this.handleSubmit.bind(this)} */}
                    <div className="lh-copy measure f5 mt0 ml2 mr2">
                    <a class={createEventButtonClass} href="/event/create">Create Event</a>
  
                      {/* <Button  type='submit'  className="dt w-50  center bg-white ">Create Event</Button> */}
                    </div>
                  </section>

{/*      @todo: content for new page             
                  <div>3</div>
                  <div>4</div> */}


                </div>
              </div>
            </article>
          </div>
        </header>

        
      </div>
    );
    // @todo do we need slider?              
    return slider;

  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default App;
