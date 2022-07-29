import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export const UserPreview = ({ user, onDeleteUser, editUser, onMsgUser }) => {
  const [edit, setEdit] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUserEdit = ({ target }) => {
    const value = target.value;
    const field = target.name;
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
  };

  const onEditUser = (ev) => {
    ev.preventDefault();
    const newUser = { ...user };
    newUser.name = name;
    newUser.email = email;
    setEdit("");
    editUser(newUser);
  };

  return (
    <div className="user grid">
      {edit === "name" ? (
        <form onSubmit={onEditUser}>
          <input
            type="text"
            name="name"
            defaultValue={name}
            onChange={handleUserEdit}
          />
        </form>
      ) : (
        <div className="user-name-email-edit flex">
          <FaPen onClick={() => setEdit("name")} cursor={"pointer"} />
          <div>{user.name}</div>
        </div>
      )}
      {edit === "email" ? (
        <form onSubmit={onEditUser}>
          <input
            type="email"
            name="email"
            defaultValue={email}
            onChange={handleUserEdit}
          />
        </form>
      ) : (
        <div className="user-name-email-edit flex">
          <FaPen onClick={() => setEdit("email")} cursor={"pointer"} />
          <div>{user.email}</div>
        </div>
      )}
      <FaTrashAlt onClick={() => onDeleteUser(user._id)} cursor={"pointer"} />
    </div>
  );
};
