import React from 'react';

const WalletGenerator = props => {
  return (
    <div>
      <h2 className="ui center aligned icon header">
        <i className="circular dollar icon"></i>
        Wallet Generator
        <div className="sub header">
          Press The Button To Generate Your Blockchain Wallet
        </div>
      </h2>
      <br />
      <br />
      <br />
      <br />
      <div className="ui container">
        <div className="ui segment">
          <form className="ui form">
            {props.warning ? (
              <div>
                <div className="ui form success">
                  <div className="field">
                    <br />
                    <div className="ui success message">
                      <div className="header">Keys Generated!</div>
                    </div>
                    <br />
                  </div>
                </div>
                <div className="ui form warning">
                  <div className="ui warning message">
                    <div className="header">Important!</div>
                    <ul className="list">
                      <li>Save your Public Key and Private Key</li>
                      <li>These keys cannot be recovered once created</li>
                      <li>
                        Sharing your private key can lead to potential security
                        risks
                      </li>
                    </ul>
                  </div>
                  <br />
                </div>
              </div>
            ) : (
              <div></div>
            )}

            {props.error ? (
              <div className="ui form error">
                <div className="ui error message">
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
            ) : (
              <div></div>
            )}
            <div className="field">
              <button className="ui blue button" onClick={props.click}>
                Generate Wallet
              </button>
            </div>
            <div className="field">
              <label>
                <h2>Public Key</h2>
              </label>
              <textarea readOnly rows="5" value={props.public}></textarea>
            </div>
            <div className="field">
              <label>
                <h2>Private Key</h2>
              </label>
              <textarea readOnly rows="5" value={props.private}></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator;
