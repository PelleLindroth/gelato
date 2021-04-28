import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import * as API from '../api'

const Home = ({ onSetUser }) => {
  const history = useHistory()

  useEffect(() => {
    (async () => {
      const token = API.getUserToken()

      if (token) {
        const user = await API.getUserByToken(token)

        if (user) {
          onSetUser(user.data.result)
          history.push('/dashboard')
        } else {
          API.removeUserToken()
        }
      }
    })()
  }, [history, onSetUser])

  return (
    <div className="home">
      <div className="home-wrapper">
        <Link to="/login">
          <button style={{ 'borderColor': '#FC5A8D' }}><p>LOG IN &gt;&gt;</p></button>
        </Link>
        <Link to="/register">
          <button style={{ 'borderColor': '#4E86F7' }}><p>REGISTER ACCOUNT &gt;&gt;</p></button>
        </Link>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetUser: user =>
    dispatch({
      type: 'SET_USER',
      payload: user
    }),
  onSetMixes: mixes =>
    dispatch({
      type: 'SET_MIXES',
      payload: mixes
    }),
  onSetFlavours: flavours =>
    dispatch({
      type: 'SET_FLAVOURS',
      payload: flavours
    })
})

export default connect(undefined, mapDispatchToProps)(Home)