const initialState = {
  chats: [],
};

export function chatReducer(state = initialState, action) {
  var chats;

  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.chats };
    case "UPDATE_CHATS":
      chats = state.chats.map((currChat) =>
        currChat._id === action.savedChat._id ? { ...action.Chat } : currChat
      );
      return { ...state, chats: chats };
    case "ADD_CHAT":
      chats = [action.chat, ...state.chats];
      return { ...state, chats: chats };
    default:
      return state;
  }
}
