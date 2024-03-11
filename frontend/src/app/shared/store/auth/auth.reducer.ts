import * as AuthActions from './auth.actions';

export interface State {
  token: string;
}

const initialState: State = {
  token: '',
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {
    default:
      return state;
  }
}
