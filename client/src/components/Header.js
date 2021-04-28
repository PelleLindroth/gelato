import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/gelato_logo2.png'

const Header = ({ user }) => {
  return (
    <header>
      <img src={logo} alt="GELATO" />
      {user.name && (
        <p><em>Logged in as {user.name}</em></p>
      )}
    </header>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header)