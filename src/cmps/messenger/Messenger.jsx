import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { chatService } from "../../services/chat.service";
import { loadChats, updateChat } from "../../store/chat/chat.actions";
import { ChatPreview } from "./ChatPreview";
import { FriendsList } from "./FriendsList";
import { Chat } from "./Chat";
import { loadUser } from "../../store/user/user.actions";

export const Messenger = () => {
  const [chatName, setChatName] = useState(null);
  const [chat, setChat] = useState(null);
  const [msg, setMsg] = useState("");
  const [isChatHide, setIsChatHide] = useState("none");
  const [isManageHide, setIsManageHide] = useState("block");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((storeState) => storeState.userModule);
  const { chats } = useSelector((storeState) => storeState.chatModule);

  useEffect(() => {
    if (!user) navigate("/");
    else {
      dispatch(loadChats(user._id));
      dispatch(loadUser());
    }
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

  useEffect(() => {
    if (chat) {
      let newChatName = chat.name;
      if (chat.users[0]._id === chat.users[1]._id) {
        loadChats(user._id);
        setChat(chat);
      }
      if (!chat.name) {
        newChatName = chatService.getChatName(chat, user.name);
      }
      setChatName(newChatName);
    }
  }, [chat]);

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
    setIsChatHide("flex");
    setIsManageHide("none");
  };

  const onBack = () => {
    setIsChatHide("none");
    setIsManageHide("block");
  };

  if (!user) return <div className="loading">loading...</div>;
  return (
    <section className="messenger">
      <div className={`messenger-manager-container ${isManageHide}`}>
        <h1>Messenger</h1>
        <div className="messenger-manager flex flex-column">
          <div className="chats-container">
            {chats.map((chat, idx) => (
              <ChatPreview
                key={idx}
                chat={chat}
                user={user}
                onSetChat={onSetChat}
              />
            ))}
          </div>
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
      </div>

      <Chat
        chat={chat}
        msg={msg}
        onSendMsg={onSendMsg}
        setMsg={setMsg}
        user={user}
        chatName={chatName}
        isChatHide={isChatHide}
        onBack={onBack}
      />
    </section>
  );
};
