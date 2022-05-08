import React from 'react'
import avar from"../images/avataaars.png"

const User = ({ user , selectUser }) => {
  return (
    <div className="user-wrapper" onClick={() => selectUser(user)}>
      <div className='user-info'>
        <div className="user-detail">
          <img src={user.avatar || avar} alt="avata" className="avatar" />
          <h4>{user.name}</h4>
        </div>
        <div
          className={`user-status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
}

export default User