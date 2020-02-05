import React, { Component } from 'react';
import axios from 'axios';
class MakeTransaction extends Component {
  state = {
    sender_public_key: this.props.public || '',
    sender_private_key: this.props.private || '',
    recipient_public_key: '',
    amount: '',
    isSuccess: false,
    serverPort: '',
    isFormFail: false,
    errorText: 'Failure'
  };
  recipientPublicKeyUpdateHandler = event => {
    event.preventDefault();
    this.setState({
      recipient_public_key: event.target.value
    });
  };
  amountUpdateHandler = event => {
    event.preventDefault();
    this.setState({
      amount: event.target.value
    });
  };
  portUpdateHandler = event => {
    event.preventDefault();
    this.setState({
      serverPort: event.target.value
    });
  };

  makeTransactionHandler = event => {
    event.preventDefault();
    if (
      this.state.amount !== '' &&
      this.state.sender_private_key !== '' &&
      this.state.sender_public_key !== '' &&
      this.state.recipient_public_key !== '' &&
      this.state.serverPort !== '' &&
      +this.state.serverPort > 0 &&
      +this.state.serverPort < 10
    ) {
      let bodyserverFormData = new FormData();
      bodyserverFormData.set('sender_public_key', this.state.sender_public_key);
      bodyserverFormData.set(
        'sender_private_key',
        this.state.sender_private_key
      );
      let self = this;
      bodyserverFormData.set(
        'recipient_public_key',
        this.state.recipient_public_key
      );
      bodyserverFormData.set('amount', this.state.amount);
      let serverFormData = new FormData();
      serverFormData.set(
        'confirmation_sender_public_key',
        this.state.sender_public_key
      );

      serverFormData.set(
        'confirmation_recipient_public_key',
        this.state.recipient_public_key
      );
      serverFormData.set('confirmation_amount', this.state.amount);
      let signature = '';
      let clientPortAddress = 'http://localhost:808';
      clientPortAddress += this.props.clientPort;
      axios
        .post(`${clientPortAddress}/generate/transaction`, bodyserverFormData, {
          headers: {
            'Access-Control-Allow-Origin': clientPortAddress
          }
        })
        .then(function(response) {
          console.log('Client', response.data);
          signature = response.data.signature;
          let nodeUrl = 'http://localhost:500';
          nodeUrl += self.state.serverPort;
          serverFormData.set('transaction_signature', signature);
          serverFormData.set('node_url', nodeUrl);
          axios
            .post(`${nodeUrl}/transactions/new`, serverFormData, {
              headers: {
                'Access-Control-Allow-Origin': nodeUrl
              }
            })
            .then(response => {
              console.log('Server', response.data);
              self.setState({
                recipient_public_key: '',
                amount: '',
                serverPort: '',
                isSuccess: true,
                isFormFail: false
              });
            })
            .catch(error => {
              console.log(error);
              console.log(self.state);

              self.setState({
                recipient_public_key: '',
                amount: '',
                serverPort: '',
                errorText: 'Node Server refused to connect',
                isSuccess: false,
                isFormFail: true
              });
            });
        })
        .catch(function(error) {
          console.log(error);
          console.log(self.state);
          self.setState({
            recipient_public_key: '',
            amount: '',
            serverPort: '',
            isSuccess: false,
            isFormFail: true,
            errorText: 'Client Server refused to connect'
          });
        });
    // } else {
    //   console.log(this.state);

    //   this.setState({
    //     recipient_public_key: '',
    //     amount: '',
    //     serverPort: '',
    //     isSuccess: false,
    //     isFormFail: true,
    //     errorText: 'Fields may be wrong or empty'
    //   });
    }
  }
  render = () => {
    return (
      <div>
        <div>
          <h2 className="ui center aligned icon header">
            <i className="circular credit card outline icon"></i>
            Make Transaction
            <div className="sub header">
              What a Good Day To Mine Some Cryptographic Coins!
            </div>
          </h2>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="ui container">
          <div className="ui segment">
            <form className="ui form">
              {this.state.isSuccess ? (
                <div className="ui form success">
                  <div className="field">
                    <br />
                    <div className="ui success message">
                      <div className="header">Transaction Completed</div>
                      <p></p>
                      <p>You're all signed up for some reward now. </p>
                      <p>Your transaction will be added to the next block. </p>
                    </div>
                    <br />
                  </div>
                </div>
              ) : this.state.isFormFail === true ? (
                <div>
                  <div className="ui form error">
                    <div className="ui error message">
                      <div className="header">
                        <h2>{this.state.errorText}</h2>
                      </div>
                      <ul className="list">
                        <li>Make sure that the server is running</li>
                        <li>Always check your port address</li>
                        <li>Some fields may be wrong</li>
                      </ul>
                    </div>
                    <br />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="field">
                <label>Sender Public Key</label>
                <input
                  readOnly
                  type="text"
                  name="sender-public-key"
                  placeholder="Sender Public Key"
                  value={this.state.sender_public_key}
                  required
                />
              </div>
              <div className="field">
                <label>Sender Private Key</label>
                <input
                  readOnly
                  type="text"
                  name="sender-private-key"
                  placeholder="Sender Private Key"
                  value={this.state.sender_private_key}
                  required
                />
              </div>
              <div className="required field">
                <label>Recipient Public Key</label>
                <input
                  onChange={this.recipientPublicKeyUpdateHandler}
                  type="text"
                  name="recipient-public-key"
                  placeholder="Recipient Public Key"
                  value={this.state.recipient_public_key}
                  required
                />
              </div>
              <div className="required field">
                <label>Amount</label>
                <input
                  onChange={this.amountUpdateHandler}
                  type="text"
                  name="number"
                  placeholder="Amount"
                  value={this.state.amount}
                  required
                />
              </div>
              <div className="required field">
                <label>Server Port</label>
                <input
                  onChange={this.portUpdateHandler}
                  type="number"
                  name="server-port"
                  placeholder="Server Port Address"
                  value={this.state.serverPort.slice(0, 1)}
                  required
                />
              </div>
              <div className="required field">
                <center>
                  <div
                    className="large ui animated positive button"
                    onClick={this.makeTransactionHandler}
                  >
                    <div className="hidden content">
                      <i className="handshake white icon"></i>
                    </div>
                    <div className="visible content">Transfer</div>
                  </div>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}
export default MakeTransaction;
