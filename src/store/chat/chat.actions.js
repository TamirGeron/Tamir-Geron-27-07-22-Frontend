import { chatService } from "../../services/chat.service";

export function loadChats(userId) {
  return async (dispatch) => {
    try {
      const chats = await chatService.getChats(userId);
      dispatch({ type: "SET_CHATS", chats });
    } catch (err) {
      console.log("UserActions: err in loadChats", err);
    }
  };
}

export function updateChat(chat) {
  return async (dispatch) => {
    try {
      const savedChat = await chatService.save(chat);
      const actionType = chat._id ? "UPDATE_CHAT" : "ADD_CHAT";
      dispatch({ type: actionType, savedChat });
    } catch (err) {
      console.log(err);
    }
  };
}
