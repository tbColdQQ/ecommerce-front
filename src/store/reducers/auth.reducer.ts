import { AuthUnionType, SIGNUP, SIGNUP_FAIL, SIGNUP_SUCCESS } from "../actions/auth.action";
export interface AuthState {
  signup: {
    loaded: boolean,
    success: boolean
  }
}

const initialState: AuthState = {
  signup: {
    loaded: false,
    success: false
  }
}

export default function authReducer (state = initialState, action: AuthUnionType) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signup: {
          loaded: false,
          success: false
        }
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          loaded: true,
          success: true
        }
      }
    case SIGNUP_FAIL:
      return {
        ...state,
        signup: {
          loaded: true,
          success: false,
          message: action.message
        }
      }
    default:
      return state
  }
}