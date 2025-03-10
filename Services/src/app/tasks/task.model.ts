export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
type taskStatusOptions ={
  value: 'open'| 'in-progress'|'done',
  taskStatus: TaskStatus,
  text: string
}[];

export const TaskStatusOptions : taskStatusOptions =[
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open',
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress',
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed',
  }
]

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
