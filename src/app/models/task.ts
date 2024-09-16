interface ITask {
  id: number;
  title: string;
  description: string;
  expirationDate: string;
  isActive: boolean;
  isComplete: boolean;
  userCreateId: number;
  userAssignId: number;
}

export default class Task implements ITask {
  id = 0;
  title = '';
  description = '';
  expirationDate = '';
  isActive = true;
  isComplete = false;
  userCreateId = 0;
  userAssignId = 0;
}
