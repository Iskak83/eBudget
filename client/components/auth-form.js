import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div id="auth-form">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email" />
          <input name="email" type="text" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password" />
          <input name="password" type="password" placeholder="Password" />
        </div>
        <div className="center-align" id="authform-button">
          <button type="submit" className="btn orange">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

// export default Login = connect(mapLogin, mapDispatch)(AuthForm)
export default (Auth = connect(mapSignup, mapDispatch)(AuthForm))

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
