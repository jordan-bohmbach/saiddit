{
   users: {
      1: {
         id: 1,
         username: "Demo",
         email: "demo@aa.io"
      },
   },
   portfolios: {
      1: {
         id: 1,
         name: "Technology",
         description: "Companies that build new things",
         balance: 25.30
         owner_id: 1
         trades: [{
             id: 1
             ticker: AAPL,
             execution_price: 200.00,
             execution_type: 'BUY',
             quantity: 50,
             transaction_date: new Date()
         }, {}]
      },
   },
   watchlists: {
      1: {
         id: 1,
         name: "Interesting companies",
         description: "disinfect and rinse",
         complete: false,
         owner_id: 1,
         stocks: [AAPL, GOOG, MSFT, GME]
      },
   },
   errors: [
         "Unauthorized",
         "Incorrect username/password combination",
         "Not enough balance to execute buy trade",
         "Not enough shares to execute sell trade",
         "Cannot delete a portfolio with stocks in it",
         "Ticker does not exist"
      ]
}