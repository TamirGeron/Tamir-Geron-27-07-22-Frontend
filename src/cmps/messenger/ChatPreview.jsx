import React from "react";
import { chatService } from "../../services/chat.service";
var moment = require("moment");

export const ChatPreview = ({ chat, user, onSetChat }) => {
  if (!chat) return <div></div>;
  return (
    <div
      className="chat-preview flex justify-between"
      onClick={() => onSetChat(chat)}
    >
      <div>
        <div className="chat-preview-name">
          {chatService.getChatName(chat, user._id)}
        </div>
        <div>{chat.msgs[chat.msgs.length - 1].msg}</div>
      </div>
      {moment(chat.msgs[chat.msgs.length - 1].date).format(" D MMMM  HH:mm")}
    </div>
  );
};