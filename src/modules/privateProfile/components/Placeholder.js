import React from 'react';

/* Relative import */
import {useSelector} from 'react-redux';
import {NO_PRIVATE_ANIMALS} from '../../../textConstant';
import {
  Placeholder as CardPlaceholder,
} from '../../../core/ui/card/Placeholder';

export const Placeholder = () => {
  const privateAnimals = useSelector((state) => state.privateProfile.animals);
  const isLoading = useSelector((state) => state.privateProfile.isLoading);

  if (privateAnimals.length === 0 && !isLoading) {
    return (<CardPlaceholder title={NO_PRIVATE_ANIMALS} />);
  }
  return null;
};
