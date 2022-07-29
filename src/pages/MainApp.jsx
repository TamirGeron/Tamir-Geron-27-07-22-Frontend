import React from "react";
import { Routes, Route } from "react-router";
import { Friends } from "../cmps/friends/Friends";
import { Messenger } from "../cmps/messenger/Messenger";

import { Header } from "../cmps/Header";
import { Login } from "../cmps/Login";
import { Signup } from "../cmps/Signup";

import { Admin } from "../cmps/admin/Admin";

export const MainApp = () => {
  return (
    <section className="main-app">
      <Header />
      <section className="main ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/messenger" element={<Messenger />} />
        </Routes>
      </section>
    </section>
  );
};
