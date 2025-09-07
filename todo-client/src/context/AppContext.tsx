import { createContext, useContext } from "react";
import type { IAppContext } from "@/types/index";

const appContext = createContext<IAppContext>({
  user: null,
  token: null,
  todos: null,
  loading: false,
  error: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  getTodos: async () => {},
  createTodo: async () => {},
  editTodo: async () => {},
  deleteTodo: async () => {},
});

export const useAppContext = () => {
  return useContext(appContext);
};

export default appContext;
