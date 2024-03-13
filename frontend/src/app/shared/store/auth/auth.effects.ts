import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs';
import { GET_NEW_ACCESS_TOKEN } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}
  loadNewAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GET_NEW_ACCESS_TOKEN),
      exhaustMap(() =>)
    )
  );
}
