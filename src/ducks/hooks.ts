import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from "react-redux";
import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./store";

export const useAppDispatch = useDispatch<
  ThunkDispatch<RootState, undefined, UnknownAction>
>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = useStore<RootState>;
