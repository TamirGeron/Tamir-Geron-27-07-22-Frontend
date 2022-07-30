import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatService } from "../../services/chat.service";
import { loadChats, updateChat } from "../../store/chat/chat.actions";
import { ChatPreview } from "./ChatPreview";
import { FriendsList } from "./FriendsList";
import { Chat } from "./Chat";

export const Messenger = () => {
  const [msgTo, setMsgTo] = useState(null);
  const [chat, setChat] = useState(null);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((storeState) => storeState.userModule);
  const { chats } = useSelector((storeState) => storeState.chatModule);

  useEffect(() => {
    if (!user) navigate("/");
    else dispatch(loadChats(user._id));
  }, []);

  useEffect(() => {
    if (chats.length > 0) {
      if (!chats[0]) {
        dispatch(loadChats(user._id));
        return;
      }
      setChat(chats[0]);
    }
  }, [chats]);

  const onSendMsg = (ev) => {
    ev.preventDefault();
    let newChat = { ...chat };
    newChat.msgs.unshift({
      msg: msg,
      date: new Date(),
      name: user.name,
      userId: user._id,
    });
    dispatch(updateChat(newChat));
    dispatch(loadChats(user._id));
    setChat(newChat);
  };

  const onSetChat = (curChat) => {
    if (chats.some((chat) => chat._id === curChat._id)) {
      setChat(curChat);
    } else {
      let newChat = chats.find((chat) =>
        chat.users.some((curUser) => curUser._id === curChat._id)
      );
      if (newChat) {
        setChat(newChat);
      } else {
        setChat(chatService.makeChat([user, curChat]));
      }
    }
  };

  if (!user) return <div className="loading">loading...</div>;
  return (
    <section className="messenger grid">
      <div className="messenger-manager">
        <h1>Messenger</h1>
        {chats.map((chat, idx) => (
          <ChatPreview
            key={idx}
            chat={chat}
            user={user}
            onSetChat={onSetChat}
          />
        ))}
        <div className="friends-list-container">
          <h1>Friends List</h1>
          {user.friends &&
            user.friends.map((friend) => (
              <FriendsList
                key={friend._id}
                friend={friend}
                onSetChat={onSetChat}
              />
            ))}
        </div>
      </div>

      <Chat
        chat={chat}
        msg={msg}
        onSendMsg={onSendMsg}
        setMsg={setMsg}
        user={user}
      />
    </section>
  );
};
