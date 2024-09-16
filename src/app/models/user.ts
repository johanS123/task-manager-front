interface IUser {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  isActive: boolean;
  roleId: number;
}

export default class User implements IUser {
  id = 0;
  firstname = '';
  surname = '';
  email = '';
  password = '';
  isActive = true;
  roleId = 0;
}
