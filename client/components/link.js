/* eslint-disable no-unused-vars */
/* eslint-disable require-await */
/* eslint-disable camelcase */
import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import {connect} from 'react-redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {setAccessTokenFetch} from '../store/user'

class PlaidLogin extends Component {
  constructor() {
    super()
    this.state = {
      plaidAccess: false,
      testing: true,
      containerName: 'plaid-container'
    }

    this.handleOnSuccess = this.handleOnSuccess.bind(this)
    this.getTransactions = this.getTransactions.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  async getTransactions() {
    await this.props.setAccessTokenFetch(this.props.userId)
    this.props.history.push('/overview')
  }

  async handleOnSuccess(public_token, metadata) {
    const publicToken = axios.post('/auth/public_token', {
      public_token: public_token
    })
    this.setState({plaidAccess: true})
  }
  async onClick() {
    this.setState({testing: false})
    this.setState({containerName: 'testing-container'})
  }
  handleOnExit() {}

  render() {
    return (
      <div>
        {!this.state.plaidAccess ? (
          <div className="" id={this.state.containerName}>
            <PlaidLink
              clientName="eBudget"
              env="sandbox"
              product={['auth', 'transactions']}
              publicKey="ae9b699cddb974bc89c10074b92e85"
              onExit={this.handleOnExit}
              onSuccess={this.handleOnSuccess}
              id="plaidLink"
              onClick={() => this.onClick()}
            >
              {this.state.testing ? (
                <div
                  type="submit"
                  id="plaidButton"
                  className="btn-large blue"
                  onClick={() => this.onClick()}
                >
                  Click here to connect your bank!
                </div>
              ) : (
//                 className="btn-very-small yellow"
                <div id="testing-credentials" >
                  Test bank credentials:{'{'} <span>User ID</span>: user_good 
                  <span>Password</span>: pass_good{'}'}
                </div>
              )}
            </PlaidLink>
          </div>
        ) : (
          <div id="plaid-container">
            <button
              type="submit"
              className="btn-large orange"
              id="plaidButton"
              onClick={this.getTransactions}
            >
              Click here to get transactions!
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    plaidAccessToken: state.user.plaidAccessToken,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    setAccessTokenFetch: id => dispatch(setAccessTokenFetch(id))
  }
}
export default withRouter(connect(mapState, mapDispatch)(PlaidLogin))
