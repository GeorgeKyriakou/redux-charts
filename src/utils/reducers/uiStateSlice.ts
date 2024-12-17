import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type DisneyCharacter } from "../types/DisneyCharsApiResponse"

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState: {
    isCharacterDetailsModalOpen: false,
    selectedCharacter: {} as DisneyCharacter,
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
      state.selectedCharacter = action.payload
    },
    toggleCharacterDetailsModal: state => {
      state.isCharacterDetailsModalOpen = !state.isCharacterDetailsModalOpen
    },
    closeCharacterInfo: state => {
      state.selectedCharacter._id = -1
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  selectCharacter,
  toggleCharacterDetailsModal,
  closeCharacterInfo,
} = uiStateSlice.actions

export default uiStateSlice
