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
  };

  const editUser = (newUser) => {
    dispatch(updateUser(newUser));
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
