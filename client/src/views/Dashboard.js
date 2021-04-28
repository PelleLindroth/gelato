import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import expandIcon from '../assets/expand.svg'
import collapseIcon from '../assets/collapse.svg'
import deleteIcon from '../assets/delete.svg'
import addIcon from '../assets/add.svg'

const Dashboard = ({user, mixes}) => {
  const history = useHistory()
  !user.name && history.push('/')

  const [clickedItemIndex, setClickedItemIndex] = useState(-1)
  
  const toggleExpand = index => {
    clickedItemIndex === index ? 
    setClickedItemIndex(-1) : 
    setClickedItemIndex(index)
  }

  return (
    <div className="dashboard">
      <h1>Your mixes</h1>
      <ul className="mix-list">
        {mixes.map((mix, index) => (
          <li key={mix.mix_id} className="mix-item">
            <div className="mix-title" >
              <p>{mix.name}</p> <img onClick={() => toggleExpand(index)} src={index === clickedItemIndex ? collapseIcon : expandIcon} alt=""/>
            </div>
              <div className={`mix-details ${index === clickedItemIndex ? 'expanded' : ''}`}>
                <ul className="flavour-list">
                  {mix.flavours.map(flavour => {
                    return (
                      <li className="flavour-name" key={flavour.flavour_id}><p>{flavour.name}</p><img className="delete-icon" src={deleteIcon} title="Delete flavour" alt="Delete"/></li>
                      )
                    })}
                  <li><img className="add-icon" src={addIcon} title="Add flavour" alt="Add"/></li>
                </ul>
                <div className="mix-footer">
                    <p>Votes: {mix.votes}</p>
                </div>
              </div>
          </li>
        ))}
      </ul>
      <div className="options">
        <button style={{ 'borderColor': '#FC5A8D' }}><p>CREATE NEW MIX &gt;&gt;</p></button>
        <button style={{ 'borderColor': '#4E86F7' }}><p>SEE ALL MIXES &gt;&gt;</p></button>
        <div className="back-button-container">
          <div className="logout-button">LOG OUT</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user, 
  mixes: state.mixes.filter(mix => mix.creator.user_id === state.user.id)
})

export default connect(mapStateToProps)(Dashboard)