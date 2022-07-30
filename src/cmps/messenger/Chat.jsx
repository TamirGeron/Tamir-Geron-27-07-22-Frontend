import React from "react";
import { chatService } from "../../services/chat.service";
var moment = require("moment");

export const Chat = ({
  chat,
  msg,
  onSendMsg,
  setMsg,
  user,
  chatName,
  isChatHide,
  onBack,
}) => {
  const sendMsg = (ev) => {
    onSendMsg(ev);
    setMsg("");
  };

  if (!chat) return <div className="chat"></div>;
  else
    return (
      <div className={`chat flex flex-column justify-between ${isChatHide}`}>
        <div className="flex justify-between">
          <h1>{chatName}</h1>
          <div onClick={() => onBack()}>Back</div>
        </div>

        <div className="msgs-form-container flex flex-column">
          <div className="msgs-container">
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
      </div>
    );
};
