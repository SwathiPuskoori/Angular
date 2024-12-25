import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCounter, selectDoubleCounter } from '../store/counter.selector';
@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent {
  count$ : Observable<number>;
  doublecount$ : Observable<number>;

  constructor(private store: Store<{counter: number}>) {
    this.count$ = store.select(selectCounter);
    this.doublecount$ = store.select(selectDoubleCounter);
  }

  
}
