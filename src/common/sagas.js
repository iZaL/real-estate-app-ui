import APP_SAGA from '../app/common/sagas';
import AUTH_SAGA from '../auth/common/sagas';
import USER_SAGA from '../user/common/sagas';
import PROPERTY_SAGA from '../property/common/sagas';

export default function* rootSaga() {
  yield [APP_SAGA, AUTH_SAGA, PROPERTY_SAGA, USER_SAGA];
}
