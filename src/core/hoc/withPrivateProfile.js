import React from 'react';
import {connect} from 'react-redux';

/*
* Relative import
* */
import {upload, sendToMail} from '../../modules/privateProfile/action';


const mapStateToProps = (state) => ({
  privateProfileItems: state.privateProfile.animals,
  itemId: state.modal.itemId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRegister: (obj) => dispatch(upload(obj)),
  dispatchSendToMail: (id) => dispatch(sendToMail(id)),
});

export const withPrivateProfile = (ComposedComponent) =>
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )((props) => {
    return <ComposedComponent {...props} />;
  });
