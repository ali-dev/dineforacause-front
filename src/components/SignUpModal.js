import React, { Component } from "react";
import { Modal, Header, Embed } from "semantic-ui-react";
import SignUp from "../containers/SignUp";
class SignUpModal extends Component {
  state = {
    modalOpen: false
  };


  componentWillReceiveProps(nextProps) {
    this.setState({modalOpen: nextProps.open})  
    console.log('componentWillReceiveProps', nextProps);
    }


  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  render() {
    return (
      <Modal open={this.state.modalOpen} onClose={this.handleClose}>
        <Modal.Header>Sign Up</Modal.Header>
        <Modal.Content >
        
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <SignUp />
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignUpModal;
