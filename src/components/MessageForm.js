import React from "react";
import Uploadimg from "../images/Uploadimg";

const MessageForm = ({ handleSubmit, text, setText ,setImg }) => {
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <Uploadimg />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
        onChange = {e => setImg(e.target.files[0])}
      />
      <div>
        <input
          type="text"
          placeholder="Enter Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button  className="send-btn">
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
