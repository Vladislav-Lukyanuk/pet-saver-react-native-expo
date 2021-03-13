import {defineModule} from '../../core/utility/module';
import {FoundComponent} from './component';
import {foundReducer} from './reducer';

export default defineModule('found', FoundComponent, foundReducer);
