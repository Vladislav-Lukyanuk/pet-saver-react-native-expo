import {defineModule} from '../../core/utility/module';
import {addReducer} from './reducer';

export default defineModule('add', () => null, addReducer);
