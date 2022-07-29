import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onSignup } from "../store/user/user.actions";
import { useDispatch, useSelector } from "react-redux";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((storeState) => storeState.userModule);

  useEffect(() => {
    if (user) navigate("/friends");
  }, [user]);

  const Signup = async (ev) => {
    ev.preventDefault();
    dispatch(onSignup({ email, name, password }));
  };

  return (
    <section className="login flex align-center justify-center flex-column">
      <form onSubmit={(ev) => Signup(ev)}>
        <div className="login-form-label-input">
          <div className="login-label">Email </div>
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            id="user_email"
            placeholder="Example@company.com"
            name="email"
          />
        </div>
        <div className="login-form-label-input">
          <div className="login-label">Name </div>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            id="user_name"
            placeholder="Israel Israeli"
            name="name"
          />
        </div>
        <div className="login-form-label-input">
          <div className="login-label">Password</div>
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            id="user-password"
            placeholder="Aa123456"
            name="password"
          />
        </div>
        <div className="login-form-label-input">
          <button className="login-signup-button">Signup</button>
        </div>
      </form>

      <div>Do you have an account?</div>
      <div className="to-signup-login">
        <Link to="/">Login</Link>
      </div>
    </section>
  );
};
