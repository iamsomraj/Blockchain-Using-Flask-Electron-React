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
    prestage: null,
    isFailed: false,
    isCopy: false
  };

  restoreHandler = stage => {
    this.setState({
      port: this.state.port,
      publickey: this.state.publickey,
      privatekey: this.state.privatekey,
      isKeySet: this.state.isKeySet,
      stage: stage,
      isFailed: this.state.isFailed
    });
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
        prestage: this.state.stage,
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
        try {
          navigator.clipboard.writeText(this.state.publickey);
          console.log('Clipboard success!');

          this.setState({
            isCopy: true
          });
        } catch (error) {
          console.log('Key copy is failed!');

          this.setState({
            isCopy: false
          });
        }
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
          className={(this.state.stage === 1 ? 'active ' : ' ') + `item `}
          onClick={event => this.headerHandler(event, 'wallet')}
        >
          Wallet Generation
        </a>
        <a
          href="/"
          className={(this.state.stage === 2 ? 'active ' : ' ') + `item `}
          onClick={event => this.headerHandler(event, 'make')}
        >
          Make Transaction
        </a>
        <a
          href="/"
          className={(this.state.stage === 3 ? 'active ' : ' ') + `item `}
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
            initial={this.props.initialise}
            copy={this.state.isCopy}
          />
        </div>
      ) : this.state.stage === 2 ? (
        <MakeTransaction
          public={this.state.publickey}
          private={this.state.privatekey}
          clientPort={this.state.port}
        />
      ) : this.state.stage === 3 ? (
        <ViewTransaction
          stage={this.state.prestage}
          close={this.restoreHandler}
        />
      ) : (
        <div></div>
      )}
      <br />
      <br />
      <div className="ui inverted vertical footer segment form-page">
        <div className="ui container">
          Made with <i className="heart icon"></i>
          <span> </span>
          By<span> </span>
          <a
            className="ui white"
            href="https://github.com/iamsomraj/"
            target="blank"
          >
            Somraj Mukherjee
          </a>
          <span> </span>
          &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

export default App;
