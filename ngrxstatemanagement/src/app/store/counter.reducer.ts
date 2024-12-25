import { Action, createReducer, on } from "@ngrx/store";
// import { CounterActions, DecrementAction, IncrementAction } from "./counter.actions";
import { decrement, increment } from "./counter.actions";
const initialstate = 0;
export const counterReducer = createReducer(
    initialstate,
    on(increment, (state,action)=> state + action.value),
    on(decrement, (state,action)=> state - action.value),
);
// export function counterReducer(state = initialstate, action: CounterActions | Action){
//     if(action.type === '[Counter] Increment'){
//         return state + (action as IncrementAction).value;
//     } else if(action.type === '[Counter] Decrement'){
//         return state - (action as DecrementAction).value;
//     }
//     return state;
// }