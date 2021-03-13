import React from 'react';
import {connect} from 'react-redux';

/* Relative import */
import {
  openViewModal,
  openAddModal,
  closeModal,
} from '../../modules/modal/action';

const mapDispatchToProps = (dispatch) => ({
  dispatchOpenViewModal: (type, id) => dispatch(openViewModal({type, id})),
  dispatchOpenAddModal: (type, id = null) => dispatch(openAddModal({type, id})),
  dispatchCloseModal: () => dispatch(closeModal()),
});

const mapStateToProps = (state) => ({
  activeModal: state.modal.activeModal,
  modalType: state.modal.modalType,
  itemId: state.modal.itemId,
});

export const withModal = (ComposedComponent) =>
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )((props) => {
    return <ComposedComponent {...props} />;
  });
