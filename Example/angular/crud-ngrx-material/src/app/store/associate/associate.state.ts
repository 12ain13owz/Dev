import { AssociatesModel } from '../models/associate.model';

export const AssocoateState: AssociatesModel = {
  list: [],
  errorMessage: '',
  associateObject: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    type: 'CUSTOMER',
    address: '',
    associategroup: 'level1',
    status: true,
  },
};
