import React from 'react'
import Uploadimg from '../images/Uploadimg'

const MessageForm = () => {
  return (
    <form className='form-tag'>
        <label  htmlFor='img'>
            <Uploadimg/>
        </label>
        <input type ="file" id="img" accept='image/*' style = {{display:'none'}}/>
        <div>
            <input type = "text" placeholder='Enter Message'/>
        </div>
        <div>
            <button className='send-btn'>Send</button>
        </div>
    </form>
  )
}

export default MessageForm