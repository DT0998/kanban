import { AppState } from '../store.reducer';

export const selectToken = (state: AppState) => state.auth.token;