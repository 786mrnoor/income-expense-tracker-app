import { configureStore } from "@reduxjs/toolkit";
import { tagReducer } from "./tag/tag.slice";

const store = configureStore({
  reducer: {
    tag: tagReducer,
  }
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
