import {defineModule} from '../../core/utility/module';
import {LostComponent} from './component';
import {lostReducer} from './reducer';

export default defineModule('lost', LostComponent, lostReducer);
