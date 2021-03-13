import React from 'react';
import {connect} from 'react-redux';

/* Relative import */
import {fetchWithPagination} from '../../modules/found/action';

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchWithPagination: (skip, count) =>
    dispatch(fetchWithPagination(skip, count)),
});

const mapStateToProps = (state) => ({
  foundItems: state.found.foundItems,
  isLoading: state.found.isLoading,
});

export const withFound = (ComposedComponent) =>
  connect(
      mapStateToProps,
      mapDispatchToProps,
  )((props) => {
    return <ComposedComponent {...props} />;
  });
