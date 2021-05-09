import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../api'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registered, setRegistered] = useState(false)
  const [error, setError] = useState(false)

  const register = async (e) => {
    e.preventDefault()
    setError(false)

    if (!name || !email || !password) {
      setError(true)
    } else {
      setError(false)
      const response = await registerUser({ name, email, password })

      if (response.success) {
        setRegistered(true)
      } else {
        setError(true)
      }
    }
  }

  return (
    <div className="register">
      <h1>REGISTER NEW ACCOUNT</h1>
      {!registered ? (
        <form onSubmit={register}>
          <label htmlFor="name">Username</label>
          <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" />
          <label htmlFor="email">Email</label>
          <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" />
          <label htmlFor="password">Password</label>
          <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" />
          {error && <p>You need to submit name, email and password</p>}
          <button style={{ 'borderColor': '#FC5A8D', 'marginTop': '2rem' }}><p>SUBMIT</p></button>
        </form>

      ) : (
        <div className="success">
          <p>YOUR ACCOUNT WAS SUCCEFULLY CREATED</p>
          <Link to="/login">
            <button style={{ 'borderColor': '#FC5A8D', 'marginTop': '2rem' }}>LOG IN</button>
          </Link>

        </div>
      )
      }
      {!registered && (
        <Link to="/" className="back-button-container">
          <div className="back-button"><p>&lt;&lt; BACK</p></div>
        </Link>
      )}
    </div>
  )
}

export default Register