import { Action } from '@ngrx/store';

export const GET_ACCESS_TOKEN = '[Auth] GET_ACCESS_TOKEN';

export const GET_REFRESH_TOKEN = '[Auth] GET_REFRESH_TOKEN';

export const GET_NEW_ACCESS_TOKEN = '[Auth] GET_NEW_ACCESS_TOKEN';
export const GET_NEW_ACCESS_TOKEN_SUCCESS =
  '[Auth] GET_NEW_ACCESS_TOKEN_SUCCESS';
export const GET_NEW_ACCESS_TOKEN_ERROR = '[Auth] GET_NEW_ACCESS_TOKEN_ERROR';

export class GetAccessToken implements Action {
  readonly type = GET_ACCESS_TOKEN;
  constructor(public payload: string) {}
}

export class GetRefreshToken implements Action {
  readonly type = GET_REFRESH_TOKEN;
  constructor(public payload: string) {}
}
export type AuthActions = GetAccessToken | GetRefreshToken | any;
