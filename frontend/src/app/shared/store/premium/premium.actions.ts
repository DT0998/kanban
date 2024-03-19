import { Action } from '@ngrx/store';

export const GET_PREMIUM = '[Premium] LOAD_PREMIUM';
export const GET_PREMIUM_SUCCESS = '[Premium] LOAD_PREMIUM_SUCCESS';
export const GET_PREMIUM_ERROR = '[Premium] LOAD_PREMIUM_ERROR';

export class GetPremium implements Action {
  readonly type = GET_PREMIUM;
  constructor(public payload: boolean) {}
}

export type PremiumActions = GetPremium | any;
