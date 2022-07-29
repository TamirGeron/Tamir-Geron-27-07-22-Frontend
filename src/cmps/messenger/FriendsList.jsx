import React from "react";

export const FriendsList = ({ friend, onSetChat }) => {
  return (
    <div
      className="friends-list flex justify-between"
      onClick={() => onSetChat(friend)}
    >
      <div>{friend.name}</div>
      <div>{friend.email}</div>
    </div>
  );
};
