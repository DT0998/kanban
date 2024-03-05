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
    default:
      return state;
  }
}
