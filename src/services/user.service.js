import { httpService } from "./http.service";

const STORAGE_KEY_LOGIN_USER = "loginUser";

export const userService = {
  getLoggedinUser,
  getUsers,
  signup,
  login,
  remove,
  update,
  logout,
};

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGIN_USER));
}

async function signup(userCred) {
  try {
    const user = await httpService.post("auth/signup", userCred);
    // // socketService.login(user._id)
    return _saveLocalUser(user);
  } catch (err) {
    console.log(err);
  }
}

async function login(userCred) {
  try {
    const user = await httpService.post("auth/login", userCred);
    if (user) {
      // socketService.login(user._id)
      return _saveLocalUser(user);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const users = await httpService.get("user");
    // socketService.login(user._id)
    return users;
  } catch (err) {
    console.log(err);
  }
  return [];
}

async function remove(userId) {
  await httpService.delete(`user/${userId}`);
}

async function update(user) {
  try {
    const savedUser = await httpService.put(`user/${user._id}`, user);
    _saveLocalUser(savedUser);
    return savedUser;
  } catch (err) {
    console.log("err", err);
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGIN_USER);
  // socketService.logout()
  return await httpService.post("auth/logout");
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGIN_USER, JSON.stringify(user));
  return user;
}
