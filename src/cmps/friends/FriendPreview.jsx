import React from "react";

export const FriendPreview = ({ friend, onDelFriend, idx }) => {
  return (
    <div className="friend-user-preview grid" onClick={() => onDelFriend(idx)}>
      <div>{friend.name}</div>
      <div>{friend.email}</div>
    </div>
  );
};
