import { Action } from '@ngrx/store';

export const GET_TOKEN = '[Premium] LOAD_TOKEN';
export const GET_TOKEN_SUCCESS = '[Premium] LOAD_TOKEN_SUCCESS';
export const GET_TOKEN_ERROR = '[Premium] LOAD_TOKEN_ERROR';

export const GET_REFRESH_TOKEN = '[Premium] LOAD_REFRESH_TOKEN';
export const GET_REFRESH_TOKEN_SUCCESS = '[Premium] LOAD_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_ERROR = '[Premium] LOAD_REFRESH_TOKEN_ERROR';

export class GetToken implements Action {
  readonly type = GET_TOKEN;
}

export class GetRefreshToken implements Action {
  readonly type = GET_REFRESH_TOKEN;
}
export type AuthActions = GetToken | any;
