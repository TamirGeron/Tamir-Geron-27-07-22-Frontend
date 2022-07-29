import React from "react";

export const UserToPreview = ({ curUser, onAddFriend }) => {
  return (
    <div
      className="friend-user-preview grid"
      key={curUser._id}
      onClick={() => onAddFriend(curUser)}
    >
      <div>{curUser.name}</div>
      <div>{curUser.email}</div>
    </div>
  );
};
