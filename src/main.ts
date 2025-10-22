import { fetchRemotes } from '@unily/remote-service';
import config from '../module-federation/config';

fetchRemotes(config)
    .catch(err => console.error(err))
    .then(() => import('./bootstrap'))
    .catch(err => console.error(err));
