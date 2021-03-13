import {createAction} from 'redux-actions';

export const openViewModal = createAction('@modal/OPEN_VIEW_MODAL');
export const openAddModal = createAction('@modal/OPEN_ADD_MODAL');
export const openRegisterAnimalModal =
    createAction('@modal/OPEN_REGISTER_ANIMAL_MODAL');
export const openQRModal = createAction('@modal/OPEN_QR_MODAL');
export const closeModal = createAction('@modal/CLOSE_MODAL');
