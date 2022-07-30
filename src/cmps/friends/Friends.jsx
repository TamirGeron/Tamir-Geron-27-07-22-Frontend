import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, updateUser, loadUser } from "../../store/user/user.actions";
import { FriendPreview } from "./FriendPreview";
import { UserToPreview } from "./UserToPreview";

export const Friends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((storeState) => storeState.userModule);
  const { users } = useSelector((storeState) => storeState.userModule);
  const [usersFiltered, setUsersFiltered] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (!user) navigate("/");
    else {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    } else dispatch(loadUsers());
    if (user.friends) setFriends(user.friends);
    else setFriends([]);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let newUsers = [...users];
    if (friends)
      newUsers = newUsers.filter((currUser) => {
        return !friends.some((friend) => {
          return friend._id === currUser._id;
        });
      });
    newUsers = newUsers.filter((curUser) => curUser._id !== user._id);
    setUsersFiltered(newUsers);
  }, [friends, users]);

  const onAddFriend = (curUser) => {
    let newUser = { ...user };
    let newFriends = friends;
    newFriends.push({
      _id: curUser._id,
      name: curUser.name,
      email: curUser.email,
    });
    newUser.friends = newFriends;
    dispatch(updateUser(newUser, true));
    setFriends(newFriends);
  };

  const onDelFriend = (idx) => {
    let newUser = { ...user };
    newUser.friends.splice(idx, 1);
    dispatch(updateUser(newUser, true));
    setFriends(newUser.friends);
  };

  if (!user) return <div className="loading">loading...</div>;
  return (
    <section className="friends flex flex-column">
      <h3>Add/Delete Friends</h3>
      <div className="friends-users-container flex space-around">
        <div className="friends-container">
          <h1>Friends</h1>
          {friends.length > 0 &&
            friends.map((friend, idx) => (
              <FriendPreview
                key={friend._id}
                friend={friend}
                onDelFriend={onDelFriend}
                idx={idx}
              />
            ))}
        </div>
        <div className="friends-container">
          <h1>Users</h1>
          {usersFiltered.map((curUser) => (
            <UserToPreview
              key={curUser._id}
              curUser={curUser}
              onAddFriend={onAddFriend}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
