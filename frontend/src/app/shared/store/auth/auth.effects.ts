import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}
}
