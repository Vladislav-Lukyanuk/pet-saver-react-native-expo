import {defineModule} from '../../core/utility/module';
import {accountReducer} from './reducer';

export default defineModule('account', () => null, accountReducer);
