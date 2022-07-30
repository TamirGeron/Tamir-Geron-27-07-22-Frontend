import { httpService } from "./http.service";
import { utils } from "./utils";

export const chatService = {
  getChats,
  save,
  makeChat,
  getChatName,
  textSide,
  getColor,
};

function getColor(chat, userId) {
  const user = chat.users.find((user) => (user._id = userId));
  return `${user.color}`;
}

function textSide(msgId, userId) {
  const res = msgId === userId ? "align-start-creme" : "align-end-white";
  return res;
}

function getChatName(chat, userName) {
  let user;
  if (chat.name) {
    return chat.name;
  } else
    user = chat.users.find((user) => {
      return user.name !== userName;
    });
  if (!user) return "loading...";
  return user.name;
}

async function getChats(userId) {
  try {
    const chats = await httpService.get(`chat/${userId}`);
    // socketService.login(user._id)
    return chats;
  } catch (err) {
    console.log(err);
  }
  return [];
}

async function save(chat) {
  try {
    let savedChat;
    if (chat._id) savedChat = await httpService.put(`chat/${chat._id}`, chat);
    else savedChat = await httpService.post(`chat`, chat);
    return savedChat;
  } catch (err) {
    console.log("err", err);
  }
}

function makeChat(users) {
  const usersToChat = users.map((user) => {
    return {
      _id: user._id,
      color: utils.getRandomColor(),
      name: user.name,
    };
  });
  return {
    users: usersToChat,
    name: "",
    msgs: [],
  };
}
