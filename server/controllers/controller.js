var plaid = require('plaid')
var moment = require('moment')
const User = require('../db/models/user')

var PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID
var PLAID_SECRET = process.env.PLAID_SECRET
var PLAID_PUBLIC_KEY = process.env.PLAID_PUBLIC_KEY
var PLAID_ENV = 'sandbox'

var ACCESS_TOKEN = null

// Initialize the Plaid client
var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2019-05-29', clientApp: 'Plaid Quickstart'}
)

const receivePublicToken = (publicToken, userId) => {
  try {
    client.exchangePublicToken(publicToken, async function(
      _error,
      tokenResponse
    ) {
      ACCESS_TOKEN = tokenResponse.access_token
      const currentUser = await User.findByPk(userId)
      await currentUser.update({plaidAccessToken: ACCESS_TOKEN})
    })
  } catch (error) {
    console.log(error)
  }
}

const getTransactions = (req, res) => {
  ACCESS_TOKEN = req.user.plaidAccessToken
  let startDate = moment()
    .subtract(30, 'days')
    .format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')

  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(_error, transactionsResponse) {
      res.json({transactions: transactionsResponse})
    }
  )
}

const yearlyTransaction = (req, res) => {
  ACCESS_TOKEN = req.user.dataValues.plaidAccessToken

  let startDate = moment()
    .subtract(365, 'days')
    .format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  console.log('made it past variables')
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(_error, transactionsResponse) {
      res.json({transactions: transactionsResponse})
    }
  )
}

// const income = async (req, res, next) => {
//   ACCESS_TOKEN = await req.user.dataValues.plaidAccessToken
//   client.getIncome(ACCESS_TOKEN, (_err, result) => {

//     try {
//       let userIncome = result.income
//       res.json({income: userIncome})
//     } catch (error) {
//       next(error)
//     }
//   })
// }

module.exports = {
  receivePublicToken,
  getTransactions,
  yearlyTransaction
}
