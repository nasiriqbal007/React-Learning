// also need to add filter to filter active or inactive users

type UserState = {
  [userId: number]: {
    active: boolean;
    show: boolean;
    
    
  };
};

type UserAction = {
  type: "toggleActive" | "toggleShow";

  userId: number;
};

export const initialState: UserState = {};
function userReducer(state: UserState, action: UserAction): UserState {
  const actionUserId = action.userId;
  const userState = state[actionUserId] || { active: true, show: true };

  switch (action.type) {
    case "toggleActive":
      return {
        ...state,
        [action.userId]: { ...userState, active: !userState.active },
      };

    case "toggleShow":
      return {
        ...state,
        [action.userId]: { ...userState, show: !userState.show },
      };
    default:
      return state;
  }
}

export type { UserState, UserAction };
export default userReducer;
