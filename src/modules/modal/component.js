import React from 'react';

/* Relative imports */
import {When} from '../../core/ui-utility/When';
import {AddModal} from './components/AddModal';
import {ViewModal} from './components/ViewModal';
import {withModal} from '../../core/hoc/withModal';
import {ModalType} from '../../type';
import {RegisterModal} from './components/RegisterModal';
import {QrModal} from './components/futureModal/QRModal';

export const ModalComponent = withModal(({activeModal}) => (
  <>
    <When condition={activeModal === ModalType.addModal}>
      <AddModal />
    </When>
    <When condition={activeModal === ModalType.viewModal}>
      <ViewModal />
    </When>
    <When condition={activeModal === ModalType.registerAnimalModal}>
      <RegisterModal />
    </When>
    <When condition={activeModal === ModalType.qrModal}>
      <QrModal />
    </When>
  </>
));
