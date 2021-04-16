import React from 'react'

const UserList = props => {
  // const [users, setUsers] = useState(props.users)

return (
  <ul>
    {props.users.map(user => <li key={user}>{user}</li>
    )}
  </ul>
)
}

export default UserList