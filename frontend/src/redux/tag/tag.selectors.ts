import type { RootState } from "../store";
import { tagAdaptor } from "./tag.adaptor";

export const { selectAll: selectTags, selectEntities: selectTagsEntities } = tagAdaptor.getSelectors<RootState>((state) => state.tags);

export const selectTagsLoading = (state: RootState) => state.tags.status === "loading";