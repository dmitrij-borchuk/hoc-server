import { set } from '../controllers/system';
import { SYSTEM_KEYS } from '../constants';

export default () => set({
  key: SYSTEM_KEYS.INITIATED,
  value: 0,
});
