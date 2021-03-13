import {handleActions} from 'redux-actions';

/* Relative import */
import {
  openAddModal,
  openViewModal,
  openRegisterAnimalModal,
  openQRModal,
  closeModal,
} from './action';
import {ModalType} from '../../type';

const initialState = {
  activeModal: null,
  modalType: null,
  itemId: null,
};

export const modalReducer = handleActions(
    {
      [openAddModal]: (state, {payload: {type, id}}) => ({
        ...state,
        activeModal: ModalType.addModal,
        modalType: type,
        itemId: id,
      }),
      [openViewModal]: (state, {payload: {type, id}}) => ({
        ...state,
        activeModal: ModalType.viewModal,
        modalType: type,
        itemId: id,
      }),
      [openRegisterAnimalModal]: (state) => ({
        ...state,
        activeModal: ModalType.registerAnimalModal,
        modalType: null,
        itemId: null,
      }),
      [openQRModal]: (state, {payload: {id}}) => ({
        ...state,
        activeModal: ModalType.qrModal,
        modalType: null,
        itemId: id,
      }),
      [closeModal]: (state) => ({
        ...state,
        activeModal: null,
        modalType: null,
        itemId: null,
      }),
    },
    initialState,
);
