import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type DisneyCharacter } from "../types/DisneyCharsApiResponse"

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState: {
    isStatisticsModalOpen: false,
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
    toggleStatisticsModal: state => {
      state.isStatisticsModalOpen = !state.isStatisticsModalOpen
    },
    calculateStatistics: state => {},
    closeCharacterInfo: state => {
      state.selectedCharacter = {} as DisneyCharacter
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  selectCharacter,
  toggleCharacterDetailsModal,
  closeCharacterInfo,
  toggleStatisticsModal,
} = uiStateSlice.actions

export default uiStateSlice
