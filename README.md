<p align="center">
  <a href="https://quizzical-euclid-762bca.netlify.app/">
    <img alt="im" src="public/eBudget.jpg" width="200" />
  </a>
</p>
<h1 align="center">
 ebudget-fsa2020.herokuapp.com
</h1>


# eBudget

Budgeting can be hard. Our app makes it easy to create a well-organized budget for all your personal financial needs.

## About

**eBudget uses technologies including:**
* [Plaid API](https://plaid.com/docs/)
* Frontend – [React.js](https://reactjs.org/), [Redux.js](https://redux.js.org/)
* Backend – [Express.js](https://expressjs.com/), [Sequelize ORM](https://sequelize.org/), [PostgreSQL](https://www.postgresql.org/)
* Style – [Materialize CSS](https://materializecss.com/), [CSS](https://www.w3.org/Style/CSS/Overview.en.html), [Charts.js](https://www.chartjs.org/docs/latest/)

## Installing

**Use the following commands on your local terminal to download the app and get started:**

`git clone https://github.com/Team-Orochimaru/financial-planner.git`

`cd financial-planner`

`npm install`

`createdb financial-planner`: creates postgres database

`npm run seed`: populates your local database with dummy users

`npm run start-dev`: starts developer environment with local server and webpack

Visit [localhost:8080](http://localhost:8080) to view the app on your local server.

If you want to run the server and/or webpack separately, you can also run `npm run start-server` and `npm run build-client`.

## Customize

Create a file called secrets.js in the project's root directory. This file is listed in the project's .gitignore file by default, and is only required in your environment for developmental purposes. The file attaches API-specific environment variables that you need to get started as a developer. **Be sure to keep the information contained in your secrets.js file confidential (i.e. don't push it to GitHub).**

Example secrets.js file:

```
process.env.PLAID_CLIENT_ID = 'Your Plaid Client ID goes here';
process.env.PLAID_SECRET = 'Your Plaid Secret goes here';
process.env.PLAID_PUBLIC_KEY = 'Your Plaid Public Key goes here';
```

## Authors

* Rob Arcand
* Ian Gelfand
* Iskak Mantyubetov
* Vasyl Semak
