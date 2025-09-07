export interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ITodo {
  _id: string;
  title: string;
  content: string;
  priority: string,
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IAppContext {
  token: string | null;
  user: IUser | null;
  todos: ITodo[] | null;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getTodos: () => Promise<void>;
  createTodo: (title: string, content: string, priority: string) => Promise<void>;
  editTodo: (id: string, title: string, content: string, priority: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}
