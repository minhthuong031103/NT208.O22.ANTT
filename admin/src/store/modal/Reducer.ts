/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editModal: false,
  addModal: false,
  deleteModal: false,
  viewModal: false,
};

const modalSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openEditModal: (state, { payload }) => {
      return {
        ...state,
        data: payload,
        editModal: true,
      };
    },
    closeEditModal: state => {
      return {
        ...state,
        editModal: false,
        data: null,
      };
    },
    openAddModal: state => {
      return {
        ...state,
        addModal: true,
      };
    },
    closeAddModal: state => {
      return {
        ...state,
        addModal: false,
        data: null,
      };
    },
    openDeleteModal: (state, { payload }) => {
      return {
        ...state,
        deleteModal: true,
        id: payload.id,
      };
    },
    closeDeleteModal: state => {
      return {
        ...state,
        deleteModal: false,
        data: null,
      };
    },
    openViewModal: (state, {payload}) =>{
      return {...state, viewModal: true, data: payload}
    },
    closeViewModal: (state) =>{
      return {...state, viewModal: false}
    },

    reset: () => initialState,
  },
});

export const {
  openEditModal,
  reset,
  closeEditModal,
  openAddModal,
  closeAddModal,
  openDeleteModal,
  closeDeleteModal,
  openViewModal,
  closeViewModal,
} = modalSlice.actions;

export default modalSlice.reducer;
