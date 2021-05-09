import React, {useState} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Create = ({flavours}) => {
  const [stage, setStage] = useState('name')
  const [mixName, setMixName] = useState('')
  const [mixFlavours, setMixFlavours] = useState([])

  const addToMix = (e, flavour) => {
   let el = e.target
   el.tagName === 'P' && (el = el.parentNode)
   
   el.style.backgroundColor = '#fc5a8d'

   if (!mixFlavours.map(flvr => flvr.id).includes(flavour.id)) {
     mixFlavours.push(flavour)
     setMixFlavours(mixFlavours)
   } else {
     const temp = mixFlavours.filter(flav => flav.id !== flavour.id)
     setMixFlavours(temp)
     el.style.backgroundColor = '#4e86f7'
   }
  }

  return (
    <div className="create">
      <h1>CREATE NEW MIX</h1>
      {stage === 'name' && (
        <div className="choose-name">
          <h3>First, pick a name for your mix:</h3>
          <input 
            onChange={e => setMixName(e.target.value)} 
            onKeyUp={(e) => e.code === 'Enter' && setStage('flavours')}  
            value={mixName}  
            type="text" 
            className="name-input"
          />
          <button 
            onClick={() => setStage('flavours')} 
            style={{ 'borderColor': '#4E86F7' }}>
            <p>CONTINUE &gt;&gt;</p>
          </button>
        </div>
      )}
      {stage === 'flavours' && (
        <div className="choose-flavours">
          <h2>{mixName}</h2>
          <h3>Now, choose some flavours!</h3>
       
          <ul className="flavours">
            {flavours.map(flavour => {
              return <li 
                  onClick={(e) => addToMix(e, flavour)} 
                  key={flavour.id}>
                  <p>{flavour.name}</p>
                  </li>
            })}
          </ul>
          <button 
            onClick={() => setStage('done')} 
            style={{ 'borderColor': '#4E86F7' }}>
            <p>CONTINUE &gt;&gt;</p>
          </button>
        </div>
      )}
      {stage === 'done' && (
        <div className="done">
          <h2>{mixName}</h2>
          <ul className="flavours">
            {mixFlavours.map(flavour => {
              return <li key={flavour.id}><p>{flavour.name}</p></li>
            })}
          </ul>
          <Link to="/dashboard">
          <button 
            style={{ 'borderColor': '#4E86F7' }}>
            <p>SAVE MIX</p>
          </button>
          </Link>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  flavours: state.flavours
})

export default connect(mapStateToProps)(Create)