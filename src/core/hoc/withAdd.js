import React from 'react';
import {connect} from 'react-redux';

/* Relative import */
import {upload} from '../../modules/add/action';

const mapDispatchToProps = (dispatch) => ({
  dispatchUpload: (modalType, obj) => dispatch(upload(modalType, obj)),
});

const mapStateToProps = (state) => ({
  modalType: state.modal.modalType,
  isLoading: state.add.isLoading,
});

export const withAdd = (ComposedComponent) =>
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )(({modalType, dispatchUpload, ...other}) => {
    return (
      <ComposedComponent
        dispatchUpload={(obj) => dispatchUpload(modalType, obj)}
        {...other}
      />
    );
  });
