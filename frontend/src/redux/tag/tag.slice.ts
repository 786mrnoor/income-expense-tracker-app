import { createSlice } from "@reduxjs/toolkit";
import { tagAdaptor, tagsInitialState } from "./tag.adaptor";
import { fetchTagList } from "./tags.thunk";

export const tagSlice = createSlice({
  name: 'tags',
  initialState: tagsInitialState,
  reducers: {
    addTag: tagAdaptor.addOne,
    setTag: tagAdaptor.setOne,
    removeTag: tagAdaptor.removeOne
  },
  extraReducers: (builder) => {
    builder.addAsyncThunk(fetchTagList, {
      pending(state) {
        state.status = "loading";
      },
      fulfilled(state, action) {
        state.status = "success";
        tagAdaptor.setAll(state, action.payload);
      },
    })
  },
});

export const { addTag, setTag, removeTag } = tagSlice.actions;
export const tagReducer = tagSlice.reducer;