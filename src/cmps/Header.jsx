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

  const onNavClick = (to) => {
    setMenuOpen("");
    navigate(to);
  };

  const logout = (ev) => {
    dispatch(onLogout());
    setMenuOpen("");
    navigate("/");
  };

  return (
    <div className={`header ${menuOpen}`}>
      <div className="main-header flex justify-between align-center">
        <div className="logo">WhatsNew</div>

        {user && (
          <div className="main-nav flex clean-list">
            <div onClick={() => onNavClick("/messenger")}>
              <div className="header-nav flex justify-center align-center">
                Messenger
              </div>
            </div>
            <div onClick={() => onNavClick("/friends")}>
              <div className="header-nav flex justify-center align-center">
                Friends
              </div>
            </div>
            {user.isAdmin && (
              <div onClick={() => onNavClick("/admin")}>
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
            <div onClick={() => onNavClick("/")}>
              <div className="header-nav flex justify-center align-center">
                Login
              </div>
            </div>
            <div onClick={() => onNavClick("/signup")}>
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
