import './styles/App.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './views/Home'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Mixes from './views/Mixes'

// import UserList from './components/UserList'
// const users = ['Falle', 'Greta', 'Kenta', 'Jonte', 'Kerstin']

function App() {
  return (
    <Router>
      <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/mixes" component={Mixes} />
    </Router>
  )
}

export default App
