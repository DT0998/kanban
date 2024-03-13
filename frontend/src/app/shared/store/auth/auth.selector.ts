import { AppState } from '../store.reducer';
export const selectAccessToken = (state: AppState) => state.auth.accessToken;
export const selectRefreshToken = (state: AppState) => state.auth.refreshToken;
