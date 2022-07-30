import React from "react";
import { chatService } from "../../services/chat.service";
var moment = require("moment");

export const Chat = ({ chat, msg, onSendMsg, setMsg, user }) => {
  const sendMsg = (ev) => {
    onSendMsg(ev);
    setMsg("");
  };

  if (!chat) return <div className="chat"></div>;
  else
    return (
      <div className="chat flex flex-column justify-between">
        <div className="msgs-container">
          <h1>{chatService.getChatName(chat, user._id)}</h1>
          {chat.msgs
            .slice(0)
            .reverse()
            .map((msg, idx) => {
              const chatColor = chatService.getColor(chat, msg.userId);
              return (
                <div
                  key={idx}
                  className={chatService.textSide(msg.userId, user._id)}
                >
                  <div>
                    <div style={{ color: chatColor }} className="chat-name">
                      {msg.name}
                    </div>
                    <div>{msg.msg}</div>
                  </div>
                  <div>{moment(msg.date).format("D MMMM  HH:mm")}</div>
                </div>
              );
            })}
        </div>
        <form onSubmit={sendMsg}>
          <input
            type="text"
            placeholder="Type here your message"
            defaultValue={msg}
            onChange={(ev) => setMsg(ev.target.value)}
          />
        </form>
      </div>
    );
};
