import {defineModule} from '../../core/utility/module';
import {ModalComponent} from './component';
import {modalReducer} from './reducer';

export default defineModule('modal', ModalComponent, modalReducer);
