import {ORM} from 'redux-orm';
import {Property} from '../property/common/model';
import {User} from '../user/common/model';

const orm = new ORM();
orm.register(Property, User);

export default orm;
