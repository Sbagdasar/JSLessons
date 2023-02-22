import { combineReducers, createStore, AnyAction } from "redux";
import { currencyReducer } from './currencyReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from 'redux-thunk'
const reducers = combineReducers({
    currency: currencyReducer,
});
export type IGlobalState = ReturnType<typeof reducers>;

export const store = createStore(reducers);

export const useAppSelector: TypedUseSelectorHook<IGlobalState> = useSelector

export type AppThunkDispatch = ThunkDispatch<IGlobalState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();