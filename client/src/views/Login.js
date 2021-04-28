import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { loginUser } from '../store/actions/User'

const Login = props => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const login = async e => {
    e.preventDefault()

    const success = await props.onLoginuser({ email, password })

    if (success) {
      history.push("/dashboard")
    } else {
      setError(true)
    }
  }

  return (
    <div className="login">
      <h1>LOG IN</h1>
      <form onSubmit={login}>
        <label htmlFor="name">Email</label>
        <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" />
        <label htmlFor="email">Password</label>
        <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" />
        {error && <p>Could not log in. Please check your email and password</p>}
        <button style={{ 'borderColor': '#FC5A8D', 'marginTop': '2rem' }}><p>SUBMIT</p></button>
      </form>

      <Link to="/" className="back-button-container">
        <div className="back-button"><p>&lt;&lt; BACK</p></div>
      </Link>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onLoginuser: credentials =>
    dispatch(loginUser(credentials))
})

export default connect(
  undefined,
  mapDispatchToProps
)(Login)