import { AppState } from '../store.reducer';

export const selectPremium = (state: AppState) => state.premium.premium;