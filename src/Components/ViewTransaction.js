import React from 'react';
import { Header, Modal } from 'semantic-ui-react';
import axios from 'axios';

class ViewTransaction extends React.Component {
  state = {
    isPortNotFilled: true,
    serverPort: '',
    transactions: null,
    isConnectionFailed: false
  };

  serverPortHandler = event => {
    event.preventDefault();
    if (
      +event.target.value.slice(0, 1) > 0 &&
      +event.target.value.slice(0, 1) < 10
    ) {
      this.setState({
        serverPort: event.target.value.slice(0, 1)
      });
    }
  };

  serverPortSubmitHandler = () => {
    if (+this.state.serverPort > 0 && +this.state.serverPort < 10) {
      let nodeUrl = 'http://localhost:500';
      nodeUrl += this.state.serverPort;
      let self = this;
      axios
        .get(`${nodeUrl}/chain`)
        .then(function(response) {
          // handle success
          self.setState({
            serverPort: self.state.serverPort,
            isPortNotFilled: false,
            transactions: response.data.chain.slice(1),
            isConnectionFailed: false
          });
        })
        .catch(function(error) {
          self.setState({
            isPortNotFilled: true,
            serverPort: '',
            transactions: null,
            isConnectionFailed: true
          });
          console.log(error);
        });
    }
  };

  render = () => {
    return (
      <div>
        {this.state.isPortNotFilled === true ? (
          <Modal open={this.state.isPortNotFilled}>
            <Modal.Header>
              <h1>Choose your node</h1>
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>
                  <h2>Select your port:</h2>
                </Header>
                <p>
                  The number is your node address so that you can specify the
                  node.
                </p>
                {this.state.isConnectionFailed ? (
                  <div>
                    <div className="ui form error">
                      <div className="ui error message">
                        <br />

                        <div className="header">
                          <h2>Connection Failure</h2>
                        </div>
                        <ul className="list">
                          <li>Make sure that the server is running</li>
                          <li>Always check your port address</li>
                        </ul>
                      </div>
                      <br />
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="ui form">
                  <div className="field">
                    <input
                      type="number"
                      onChange={this.serverPortHandler}
                      value={this.state.serverPort.slice(0, 1)}
                    />
                  </div>
                  <div className="field"></div>
                  <div
                    class="ui animated blue button"
                    onClick={this.serverPortSubmitHandler}
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
          <div>
            <h2 className="ui center aligned icon header">
              <i className="circular list alternate outline icon"></i>
              View Transaction
              <div className="sub header">
                What a wonderful time to have you here!
              </div>
            </h2>
            <br />
            <div className="ui conatiner">
              <center>
                <div
                  className="large ui animated blue button"
                  onClick={this.serverPortSubmitHandler}
                >
                  <div className="hidden content">Reload</div>
                  <div className="visible content">
                    <i className="sync icon"></i>
                  </div>
                </div>
              </center>
            </div>
            <br />
            <br />
            <br />

            <div className="ui container">
              <div className="ui segment">
                <table className="ui inverted fixed single line five column celled very padded table">
                  <thead>
                    <tr>
                      <th>Sender Public Key</th>
                      <th>Recipient Public Key</th>
                      <th>Amount</th>
                      <th>Timestamp</th>
                      <th>Blocknumber</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.transactions !== null ? (
                      this.state.transactions.map((ele, index) => {
                        let blocknumber = ele.block_number;
                        let ts = new Date(ele.timestamp * 1000);
                        let timestamp = ts.toLocaleString();

                        return (
                          <React.Fragment key={index}>
                            {ele.transactions.map((el, ind) => {
                              return (
                                <tr key={ind}>
                                  <td>{el.sender_public_key}</td>
                                  <td>{el.recipient_public_key}</td>
                                  <td>{el.amount}</td>
                                  <td>{timestamp}</td>
                                  <td>{blocknumber}</td>
                                </tr>
                              );
                            })}
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  };
}

export default ViewTransaction;
