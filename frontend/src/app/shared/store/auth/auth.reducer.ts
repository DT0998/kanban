import * as AuthActions from './auth.actions';

export interface State {
  accessToken: string;
  refreshToken: string;
}

const initialState: State = {
  accessToken: '',
  refreshToken: '',
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    case AuthActions.GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case AuthActions.GET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };
    default:
      return state;
  }
}
