import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { createLogger } from 'redux-logger';
import { requestEventForEdit } from '../actions';

// const logger = createLogger()

const mapStateToProps = (state) => {
  return {
    event: state.requestEventForEdit.event, 
    isPending: state.requestEventForEdit
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestEvent: (editId) => dispatch(requestEventForEdit(editId))
  }
}
  

class EventManage extends Component {
  componentDidMount() {
    this.props.onRequestEvent(this.props.match.params.editId);
  }
  render() {
      const { event } = this.props;
      let causeDetails = {};
      if (event.causeDetails !== undefined) {
        causeDetails = JSON.parse(event.causeDetails);
      }
      const imagePath = 'https://dfac-main.s3.amazonaws.com/app';
    return (
    <div  className="App ">
      <header className="App-header ">
        <nav className="dt w-100  center bg-white o-90 mt0"> 
            <div  className=" v-mid tr pa3 ">
              <a className="f8 fw6 hover-red  no-underline gray dn dib-ns pv2 ph3" href="/" >How it Works</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Causes</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Organizations</a> 
              <a className="f8 fw6 hover-red no-underline gray dn dib-ns pv2 ph3" href="/" >Partners</a>
              <a className="f8 fw6 hover-red no-underline gray dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
            </div>
          </nav>  
        <div className="">
          <header className="bb b--black-40 pv4 bg-white">
            <h3   className="f2 fw7 ttu tracked lh-title mt0 mb3  ml2 mr2 "> Manage Event</h3>
          </header>
          if (isPending) {
          <article data-name="article-full-bleed-background">
    	      <div className="cf" >
    	        <div className="fl w-100   black-70 f3  ">
                {causeDetails.causeName}
    	          {/*
                <header className="bb b--black-80 pv2 bg-white">
    	            <h4 style="font-family: 'Varela', sans-serif;" className="f3 fw6 i lh-title mt0 ml2 mr3 ">Create Event</h4>  
    	          </header>
                */}
                <section className="bg-white w-80 center  ">
					
                    <div className="fl w-50 w-100-m w-50-l pa2">
                        <img className="w-100 db outline black-10" alt={causeDetails.image} src={`${imagePath}/${causeDetails.image}`} />

                        <dl className="mt2 f6 lh-copy tc">
                            <dt className="clip">Title</dt>
                            <dd className="ml0 black truncate w-100">{event.eventName}</dd>
                            <dt className="clip">{causeDetails.causeName}</dt>
                            <dd className="ml0 gray truncate w-100">{causeDetails.organizationName}</dd>


                        </dl>
                    </div>
                    <div className="fl w-50 w-50-m w-50-r pa2">
                        {causeDetails.details}
                    </div>


					 
				</section>


  	          {/* <CreateEventForm/> */}
  	        </div>
  	      </div>
  	    </article>
        }
	    </div>
      </header>
    </div>
    
  	);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventManage)