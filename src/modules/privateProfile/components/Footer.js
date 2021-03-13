import React, {useCallback} from 'react';
import {Footer as NBFooter} from 'native-base';

/*
* Relative import
* */
import {CenteredButton} from '../../../core/ui/button/CenteredButton';
import {ADD} from '../../../textConstant';
import {useDispatch} from 'react-redux';
import {openRegisterAnimalModal} from '../../modal/action';

export const Footer = () => {
  const dispatch = useDispatch();
  const dispatchOpenRegisterModal =
      useCallback(() => dispatch(openRegisterAnimalModal()), []);

  return (
    <NBFooter style={{backgroundColor: 'white'}}>
      <CenteredButton text={ADD} onPress={() => dispatchOpenRegisterModal()} />
    </NBFooter>
  );
};
