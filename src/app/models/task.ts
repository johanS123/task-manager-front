export interface Task {
  id: number;
  title: string;
  description: string;
  expirationDate: string;
  isActive: boolean | string;
  isComplete: boolean | string;
  userCreateId: number;
  userAssignId: number;
}
