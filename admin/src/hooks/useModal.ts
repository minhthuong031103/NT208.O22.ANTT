/** @format */

import {
  closeAddModal,
  closeEditModal,
  openAddModal,
  openEditModal,
  openDeleteModal,
  closeDeleteModal,
  openViewModal,
  closeViewModal,
} from '@/store/modal';
import { useDispatch, useSelector } from 'react-redux';

export const useModal = () => {
  const modal = useSelector((state: any) => state.modal);
  const dispatch = useDispatch();
  const onOpenEditModal = ({ data }) => {
    dispatch(openEditModal(data));
  };

  const onCloseEditModal = () => {
    dispatch(closeEditModal());
  };
  const onOpenAddModal = () => {
    dispatch(openAddModal());
  };
  const onCloseAddModal = () => {
    dispatch(closeAddModal());
  };

  const onOpenDeleteModal = ({ id }) => {
    dispatch(openDeleteModal({ id }));
  };
  const onCloseDeleteModal = () => {
    dispatch(closeDeleteModal());
  };
  const onOpenViewModal = ({data}) => {
    dispatch(openViewModal(data));
  }
  const onCloseViewModal = () =>
  {
    dispatch(closeViewModal());
  }
  return {
    modal,
    onOpenEditModal,
    onCloseEditModal,
    onOpenAddModal,
    onCloseAddModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onOpenViewModal,
    onCloseViewModal,
  };
};
