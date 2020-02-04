import React, { Component } from 'react';
import WalletGenerator from './Components/WalletGenerator';
import ViewTransaction from './Components/ViewTransaction';
import MakeTransaction from './Components/MakeTransaction';
import axios from 'axios';

class App extends Component {
  state = {
    port: this.props.port || '1',
    publickey: '',
    privatekey: '',
    isKeySet: false,
    stage: 1,
    isFailed: false
  };

  headerHandler = (event, tabName) => {
    event.preventDefault();
    if (tabName === 'wallet') {
      this.setState({ stage: 1 });
    } else if (tabName === 'make') {
      this.setState({
        stage: 2
      });
    } else {
      this.setState({
        stage: 3
      });
    }
  };

  getKeyHandler = async event => {
    let generateWalletUrl = 'http://localhost:808';
    generateWalletUrl += this.state.port;

    event.preventDefault();
    if (!this.state.isKeySet) {
      let response = null;
      try {
        response = await axios.get(`${generateWalletUrl}/wallet/new`, {
          headers: {
            'Access-Control-Allow-Origin': generateWalletUrl
          }
        });
        this.setState({
          publickey: response.data['public_key'],
          privatekey: response.data['private_key'],
          isKeySet: true,
          isFailed: false
        });
      } catch (error) {
        console.log(error);
        this.setState({
          isKeySet: false,
          isFailed: true
        });
      }
    } else {
      this.setState({
        publickey: this.state.publickey,
        isKeySet: true,
        isFailed: false
      });
      this.setState({
        privatekey: this.state.privatekey,
        isKeySet: true,
        isFailed: false
      });
    }
  };

  render = () => (
    <div className="App">
      <div className="ui three item fixed borderless menu">
        <a
          href="/"
          className="item"
          onClick={event => this.headerHandler(event, 'wallet')}
        >
          Wallet Generation
        </a>
        <a
          href="/"
          className="item"
          onClick={event => this.headerHandler(event, 'make')}
        >
          Make Transaction
        </a>
        <a
          href="/"
          className="item"
          onClick={event => this.headerHandler(event, 'view')}
        >
          View Transaction
        </a>
      </div>
      <br />
      <br />
      <br />
      <br />
      {this.state.stage === 1 ? (
        <div>
          <WalletGenerator
            click={this.getKeyHandler}
            public={this.state.publickey}
            private={this.state.privatekey}
            warning={this.state.isKeySet}
            error={this.state.isFailed}
          />
        </div>
      ) : this.state.stage === 2 ? (
        <MakeTransaction
          public={this.state.publickey}
          private={this.state.privatekey}
          clientPort={this.state.port}
        />
      ) : this.state.stage === 3 ? (
        <ViewTransaction />
      ) : (
        <div></div>
      )}
      <br />
      <br />
      <div className="ui inverted vertical footer segment form-page">
        <div className="ui container">Somraj Mukherjee &copy; 2020</div>
      </div>
    </div>
  );
}

export default App;
