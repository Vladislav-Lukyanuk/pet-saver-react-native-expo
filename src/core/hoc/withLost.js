import React from 'react';
import {connect} from 'react-redux';

/* Relative import */
import {fetchWithPagination} from '../../modules/lost/action';

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchWithPagination: (skip, count) =>
    dispatch(fetchWithPagination(skip, count)),
});

const mapStateToProps = (state) => ({
  lostItems: state.lost.lostItems,
  isLoading: state.lost.isLoading,
});

export const withLost = (ComposedComponent) =>
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )((props) => {
    return <ComposedComponent {...props} />;
  });
