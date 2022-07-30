import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  removeUser,
  updateUser,
} from "../../store/user/user.actions";
import { useNavigate } from "react-router-dom";

import { UserPreview } from "./UserPreview";
import { loadChats, updateChat } from "../../store/chat/chat.actions";

export const Admin = () => {
  const { users } = useSelector((storeState) => storeState.userModule);
  const { user } = useSelector((storeState) => storeState.userModule);
  const { chats } = useSelector((storeState) => storeState.chatModule);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    } else {
      dispatch(loadUsers());
      dispatch(loadChats());
    }
  }, []);

  const onDeleteUser = (userId) => {
    dispatch(removeUser(userId));
    users.forEach((user) => {
      if (userId !== user._id) {
        const newFriends = user.friends.filter(
          (friend) => friend._id !== userId
        );
        let newUser = { ...user };
        newUser.friends = newFriends;
        dispatch(updateUser(newUser, newUser.isAdmin));
      }
    });
  };

  const editUser = (editUser) => {
    dispatch(updateUser(editUser));
    users.forEach((user) => {
      let newUser = { ...user };
      const friendIdx = user.friends.findIndex((friend) => {
        return friend._id === editUser._id;
      });
      if (friendIdx >= 0) {
        newUser.friends[friendIdx].name = editUser.name;
        newUser.friends[friendIdx].email = editUser.email;
        dispatch(updateUser(newUser, newUser.isAdmin));
      }
    });
    chats.forEach((chat) => {
      let newChat = { ...chat };
      const chatIdx = chat.users.findIndex((user) => user._id === editUser._id);
      if (chatIdx >= 0) {
        newChat.users[chatIdx].name = editUser.name;
        const newMsgs = chat.msgs.map((msg) => {
          let newMsg = { ...msg };
          if (msg.userId === editUser._id) newMsg.name = editUser.name;
          return newMsg;
        });
        newChat.msgs = newMsgs;
        dispatch(updateChat(newChat));
      }
    });
  };

  return (
    <div className="admin ">
      <div className="users flex flex-column">
        <div className="users-header grid">
          <div>Name</div>
          <div>Email</div>
          <div></div>
        </div>
        {users.map((user) => (
          <UserPreview
            user={user}
            key={user._id}
            onDeleteUser={onDeleteUser}
            editUser={editUser}
          />
        ))}
      </div>
    </div>
  );
};
