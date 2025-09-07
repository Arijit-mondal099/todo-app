import TodoCard from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/context/AppContext";
import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Home: React.FC = () => {
  const { todos, getTodos } = useAppContext();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [priority, setpriority] = useState<"low" | "medium" | "high" | "">("");
  const { createTodo, loading } = useAppContext();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-full max-w-md mt-10" />

        <section className="pt-10 grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {Array(6)
            .fill(0)
            .map(() => (
              <Skeleton className="w-full h-44 rounded-xl" />
            ))}
        </section>
      </section>
    );
  }

  console.log(todos)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-10 flex gap-2 justify-between">
        <h2 className="text-3xl items-center md:text-4xl font-bold">
          Your Todos
        </h2>

        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Todo
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new Todo</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new todo.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Title</Label>
                <Input
                  id="name-1"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  placeholder="Toto title"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username-1">Content</Label>
                <Textarea
                  id="username-1"
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                  placeholder="Todo content"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="username-1">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(val) =>
                    setpriority(val as "low" | "medium" | "high")
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Set todo priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button
                type="submit"
                onClick={() => createTodo(title, content, priority)}
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <section className="pt-10 grid items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {todos?.length ? (
          todos.map((t) => (
            <TodoCard key={t._id} todo={t} />
          ))
        ) : (
          <p className="text-2xl font-medium text-gray-500 col-span-4">
            Looks like todo haven&apos;t been created yet!
          </p>
        )}
      </section>
    </main>
  );
};

export default Home;
