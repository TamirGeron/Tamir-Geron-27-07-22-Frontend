import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin } from "../store/user/user.actions";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((storeState) => storeState.userModule);

  useEffect(() => {
    if (user) navigate("/friends");
  }, [user]);

  const login = async (ev) => {
    ev.preventDefault();
    dispatch(onLogin({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <section className="login flex align-center justify-center flex-column">
      <form onSubmit={(ev) => login(ev)}>
        <div className="login-form-label-input">
          <div className="login-label">Email</div>
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
          <button className="login-signup-button">Login</button>
        </div>
      </form>

      <div>Don't have an account yet?</div>
      <div className="to-signup-login">
        <Link to="/signup">Sign up</Link>
      </div>
    </section>
  );
};
