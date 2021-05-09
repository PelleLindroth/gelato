import './styles/App.scss'

import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as API from './api'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Create from './views/Create'
import Mixes from './views/Mixes'
import Register from './views/Register'

const App = ({ onSetMixes, onSetFlavours }) => {
  useEffect(() => {
    (async () => {
      const mixes = await API.getMixes()
      mixes.success && onSetMixes(mixes.results)
    })()
  }, [onSetMixes])

  useEffect(() => {
    (async () => {
      const flavours = await API.getFlavours()
      flavours && onSetFlavours(flavours)
    })()
  }, [onSetFlavours])

  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create" component={Create} />
      <Route path="/mixes" component={Mixes} />
    </Router>
  )
}

const mapDispatchToProps = dispatch => ({
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

export default connect(undefined, mapDispatchToProps)(App)
