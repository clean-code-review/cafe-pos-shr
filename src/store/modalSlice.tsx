/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isModalOpen: boolean;
  modalContent: React.ReactNode;
}

const initialState: ModalState = {
  isModalOpen: false,
  modalContent: <div />,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setModalContent: (state, action: PayloadAction<React.ReactNode>) => {
      state.modalContent = action.payload;
    },
    initializeModal: state => {
      state.isModalOpen = initialState.isModalOpen;
      state.modalContent = initialState.modalContent;
    },
  },
});

export const { toggleIsModalOpen, setModalContent, initializeModal } = modalSlice.actions;

export default modalSlice.reducer;
