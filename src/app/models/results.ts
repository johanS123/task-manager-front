import { Task } from './task';

export interface Results {
  current_page: number;
  data: Task[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Object[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}
