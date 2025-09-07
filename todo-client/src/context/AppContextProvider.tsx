import React, { useCallback, useState } from "react";
import appContext from "@/context/AppContext";
import type { IUser, ITodo, IAppContext } from "@/types/index";
import { toast } from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [todos, setTodos] = useState<ITodo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
      });
      setLoading(false);

      if (res.data.success && res.data.data.token) {
        const newToken = res.data.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        toast.success("Register successfully");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      setLoading(false);

      if (res.data.success && res.data.data.token) {
        const newToken = res.data.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        toast.success("Login successfully");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setTodos(null);
    localStorage.removeItem("token");
    toast.success("logout successfully");
  };

  const getTodos = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(false);

      if (res.data.data) {
        setTodos(res.data.data);
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  }, [token]);

  const createTodo = async (title: string, content: string, priority: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/todos",
        { title, content, priority, },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);

      if (res.data.success) {
        getTodos();
        toast.success("Todo created");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  };

  const editTodo = async (id: string, title: string, content: string, priority: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        `/todos/${id}`,
        { title, content, priority, },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);

      if (res.data.success) {
        getTodos();
        toast.success("Todo updated");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.delete(
        `/todos/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);

      if (res.data.success) {
        getTodos();
        toast.success("Todo deleted");
      }
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        toast.error(err.response?.data.message || "Something went wrong!");
      }
    }
  }

  const value: IAppContext = {
    token,
    user,
    loading,
    error,
    todos,
    register,
    login,
    logout,
    getTodos,
    createTodo,
    editTodo,
    deleteTodo
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppContextProvider;
