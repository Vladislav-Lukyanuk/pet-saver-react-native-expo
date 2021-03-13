import React from 'react';
import {useSelector} from 'react-redux';
import {Content as NBContent} from 'native-base';

/* Relative import */
import {List} from './List';

export const Content = () => {
  const privateAnimals = useSelector((state) => state.privateProfile.animals);

  if (privateAnimals.length > 0) {
    return (
      <NBContent>
        <List />
      </NBContent>
    );
  }

  return null;
};
