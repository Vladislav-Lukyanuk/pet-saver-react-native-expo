import {defineModule} from '../../core/utility/module';
import {PrivateProfile} from './component';
import {privateProfileReducer} from './reducer';

export default defineModule(
    'privateProfile',
    PrivateProfile,
    privateProfileReducer,
);
