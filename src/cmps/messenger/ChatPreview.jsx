import React from "react";
import { chatService } from "../../services/chat.service";
var moment = require("moment");

export const ChatPreview = ({ chat, user, onSetChat }) => {
  console.log("ChatPreview", chat);

  if (!chat) return <div></div>;
  return (
    <div
      className="chat-preview flex justify-between"
      onClick={() => onSetChat(chat)}
    >
      <div>
        <div className="chat-preview-name">
          {chatService.getChatName(chat, user.name)}
        </div>
        <div>{chat.msgs[0].msg}</div>
      </div>
      {moment(chat.msgs[0].date).format(" D MMMM  HH:mm")}
    </div>
  );
};
