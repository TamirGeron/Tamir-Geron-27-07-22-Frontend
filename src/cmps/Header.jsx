import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { onLogout } from "../store/user/user.actions";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(null);
  const { user } = useSelector((storeState) => storeState.userModule);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (menuOpen) setMenuOpen("");
    else setMenuOpen("menu-open");
  };

  const logout = (ev) => {
    dispatch(onLogout());
    navigate("/");
  };

  return (
    <div className={`header ${menuOpen}`}>
      <div className="main-header flex justify-between align-center">
        <div className="logo">WhatsNew</div>

        {user && (
          <div className="main-nav flex clean-list">
            <div onClick={() => navigate("/messenger")}>
              <div className="header-nav flex justify-center align-center">
                Messenger
              </div>
            </div>
            <div onClick={() => navigate("/friends")}>
              <div className="header-nav flex justify-center align-center">
                Friends
              </div>
            </div>
            {user.isAdmin && (
              <div onClick={() => navigate("/admin")}>
                <div className="header-nav flex justify-center align-center">
                  Admin
                </div>
              </div>
            )}
            <div onClick={logout}>
              <div className="header-nav flex justify-center align-center">
                Logout
              </div>
            </div>
          </div>
        )}
        {!user && (
          <div className="main-nav flex clean-list">
            <div onClick={() => navigate("/")}>
              <div className="header-nav flex justify-center align-center">
                Login
              </div>
            </div>
            <div onClick={() => navigate("/signup")}>
              <div className="header-nav flex justify-center align-center">
                Signup
              </div>
            </div>
          </div>
        )}
        <div className="btn-toggle-menu" onClick={() => toggleMenu()}>
          ☰
        </div>
      </div>
    </div>
  );
};
