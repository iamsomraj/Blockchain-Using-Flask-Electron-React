/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import App from '../App';
import { Header, Modal } from 'semantic-ui-react';

class Login extends Component {
  state = {
    isLoginNotDone: true,
    instance: ''
  };

  instanceHandler = event => {
    event.preventDefault();
    if (
      +event.target.value.slice(0, 1) > 0 &&
      +event.target.value.slice(0, 1) < 10
    ) {
      this.setState({
        instance: event.target.value
      });
    }
  };

  instanceSubmitHandler = () => {
    if (+this.state.instance > 0 && +this.state.instance < 10) {
      this.setState({
        isLoginNotDone: false
      });
    }
  };

  render = () => {
    return (
      <div>
        {this.state.isLoginNotDone === true ? (
          <Modal open={this.state.isLoginNotDone}>
            <Modal.Header>
              <h1>Choose your port</h1>
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>
                  <h2>Enter a number:</h2>
                </Header>
                <p>
                  Instance is your port address so that we can Identify you.
                </p>
                <div className="ui form">
                  <div className="field">
                    <input
                      type="number"
                      onChange={this.instanceHandler}
                      value={this.state.instance.slice(0, 1)}
                    />
                  </div>
                  <div className="field"></div>
                  {/* <button
                    className="ui blue button"
                    onClick={this.instanceSubmitHandler}
                  >
                    Submit
                  </button> */}
                  <div
                    class="ui animated blue button"
                    onClick={this.instanceSubmitHandler}
                  >
                    <div class="visible content">Submit</div>
                    <div class="hidden content">
                      <i class="right arrow icon"></i>
                    </div>
                  </div>
                </div>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        ) : (
          <App port={this.state.instance} />
        )}
      </div>
    );
  };
}

export default Login;
