import React from 'react'
import {connect} from 'react-redux'
import Transactions from './Transactions'
import BankAccount from './currentAccount'
import {fetchTransactions} from '../store/transactions'

class AccountOverview extends React.Component {
  async componentDidMount() {
    await this.props.getTransactions()
  }

  render() {
    let transactions = this.props.transactions
    let transAmount = 0
    if (transactions.length) {
      transactions = this.props.transactions
      transactions[0].transactions.map(transaction => {
        transAmount += transaction.amount
      })
    }

    return (
      <div className="accountOverViewContainer">
        {!transactions || !transactions.length ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            <h2>Account Overview</h2>
            <h3>
              <span className="accountOverViewBold">
                Total Transaction Amount:
              </span>{' '}
              ${transAmount.toFixed(2)}
            </h3>

            {transactions[0].accounts.map(account => {
              if (BankAccount(transactions[0])[account.account_id]) {
                return (
                  <ul
                    key={account.account_id}
                    className="collection with-header"
                  >
                    <li className="collection-header" id="collection-header">
                      <h4>{account.name}</h4>
                    </li>

                    <Transactions
                      transactions={
                        BankAccount(transactions[0])[account.account_id]
                      }
                    />
                  </ul>
                )
              }
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.transactions,
    plaidAccessToken: state.user.plaidAccessToken
  }
}

const mapDispatch = dispatch => {
  return {
    getTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(AccountOverview)
