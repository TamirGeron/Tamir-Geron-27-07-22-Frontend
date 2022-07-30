import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUsers,
  removeUser,
  updateUser,
} from "../../store/user/user.actions";
import { useNavigate } from "react-router-dom";

import { UserPreview } from "./UserPreview";

export const Admin = () => {
  const { users } = useSelector((storeState) => storeState.userModule);
  const { user } = useSelector((storeState) => storeState.userModule);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    } else dispatch(loadUsers());
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
    // console.log(editUser);
    dispatch(updateUser(editUser));
    users.forEach((user) => {
      let newUser = { ...user };
      console.log("user", editUser._id);
      const friendIdx = user.friends.findIndex((friend) => {
        console.log("friend", friend._id);
        return friend._id === editUser._id;
      });
      console.log(friendIdx);
      if (friendIdx >= 0) {
        newUser.friends[friendIdx].name = editUser.name;
        newUser.friends[friendIdx].email = editUser.email;
        dispatch(updateUser(newUser, newUser.isAdmin));
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
