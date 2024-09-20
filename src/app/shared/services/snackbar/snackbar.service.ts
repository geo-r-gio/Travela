import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new BehaviorSubject<string | null>('');
  snackbarState = this.snackbarSubject.asObservable();

  show(message: string) {
    this.snackbarSubject.next(message);
  }

  clear() {
    this.snackbarSubject.next(null);
  }
}
