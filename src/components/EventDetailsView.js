import React, { Component } from "react";
import causeImage from "../assets/images/cause-dtl-img.png";
import Payment from "./Payment";

class EventDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDetails: "",
      hostName: "",
      hostEmail: "",
      location: "",
      date: "",
      time: "",
      endTime: "",
      // maxCapacity: '',
      attendees: [],
      attendeeEmail: "",
      attendeeName: "",
    };

    // if (this.props.event) {
    //   this.state = this.props.event;
    //   this.state = this.props.guest;
    //   this.state = this.props.guestId;
    // }
  }

  componentDidMount() {
    // this.props.onRequestCause(this.props.match.params.organizationId, this.props.match.params.id);
  }
  render() {
    const { event, guest, guestId } = this.props;
    return (
      

        <div className="dtl-lft lft">
          <section class="rvsp-box">
            <h6>Will You be able yo make it?</h6>

            <div className="radio-box">
              <label className="container-ra">
                Attending
                <input type="radio" checked="checked" name="radio" />
                <span className="checkmark-ra"></span>
              </label>

              <label className="container-ra">
                Not attending
                <input type="radio" name="radio" />
                <span className="checkmark-ra"></span>
              </label>
            </div>
          </section>
          <article className="rvsp-box">
            <h6>Event Details</h6>
            <div className="host-lft lft">
              <label>
                Host Name: <span>{event.hostName}</span>
              </label>

              <div className="sep">
                <div className="lft evt-date">
                  <label>
                    Event Date: <span> {event.date} 15 June, 2020</span>
                  </label>
                </div>

                <div className="lft">
                  <label>
                    {/* @todo add end time  */}
                    Event Time: <span>{event.time} to 8:30 PM</span>
                  </label>
                </div>

                <div className="clear"></div>
              </div>

              <label>
                Vanue:
                <span>980 Jolly Road, Suite 300 Blue Bell, PA 19422</span>
              </label>
            </div>

            <div className="host-rgt rgt">
              {/* <label>Minimum Donation:</label>

            <span>$0</span> */}

              <label>Recommended Donation:</label>

              <span>${event.recommendedDonation}</span>
            </div>

            <div class="clear"></div>

            <h5>Events Details:</h5>

            <div class="evt-dtl">
              <p>{event.details}</p>
            </div>
          </article>

          {/* CAUSE goes here */}

          <article class="rvsp-box">
            <h6>Cause Details</h6>

            <figure class="lft">
              <img src={causeImage} alt="image" />
            </figure>

            <div class="cause-dtl-rgt rgt">
              <small>Fay Inc</small>

              <h3>Gather a gardening gang</h3>

              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum.
              </p>

              <ul>
                <li>Etiam ut orci accumsan, aliquam odio </li>

                <li>Etiam at lorem venenatis, vulputate urna </li>

                <li>Vestibulum volutpat dui id ex rutrum, sit</li>
              </ul>

              <div class="progress-area">
                <span class="lft">75%</span>

                <span class="rgt">$10,000 Goal</span>

                <div class="clear"></div>

                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    aria-valuenow="70"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {" "}
                  </div>
                </div>
              </div>

              <p>
                <span class="lft">25 Days </span>{" "}
                <span class="rgt">665 Supporters</span>
              </p>

              <div class="clear"></div>
            </div>

            <div class="clear"></div>
          </article>
        </div>
      
    );
  }
}

export default EventDetailsView;
