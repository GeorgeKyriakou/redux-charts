import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type DisneyCharacter } from "../types/DisneyCharsApiResponse"

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState: {
    selectedCharacterId: 0,
    pagination: {
      currentPage: 1,
      charactersPerPage: 50,
    },
  },
  reducers: {
    pagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    selectCharacter: (state, action: PayloadAction<DisneyCharacter>) => {
      state.selectedCharacterId = action.payload._id
    },
    openCharacterInfo: state => {
      // TODO: Implement
    },
    closeCharacterInfo: (state, action) => {
      // TODO: Implement
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectCharacter, openCharacterInfo, closeCharacterInfo } =
  uiStateSlice.actions

export default uiStateSlice
