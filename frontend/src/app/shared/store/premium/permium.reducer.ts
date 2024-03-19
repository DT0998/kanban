import * as PremiumActions from './premium.actions';

export interface State {
  premium: boolean;
}

const initialState: State = {
  premium: false,
};

export function premiumReducer(
  state = initialState,
  action: PremiumActions.PremiumActions
): State {
  switch (action.type) {
    case PremiumActions.GetPremium:
      return {
        ...state,
        premium: action.payload,
      };
    default:
      return state;
  }
}
