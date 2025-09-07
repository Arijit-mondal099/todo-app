import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";
import type { ITodo } from "@/types";
import { useAppContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";

interface TodoCard {
  todo: ITodo;
}

const TodoCard: React.FC<TodoCard> = ({ todo }) => {
  const [title, settitle] = useState(todo.title || "");
  const [content, setcontent] = useState(todo.content || "");
  const [priority, setpriority] = useState(todo.priority);
  const { deleteTodo, editTodo } = useAppContext();

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">{todo.title}</CardTitle>
        <CardDescription>{moment(todo.createdAt).fromNow()}</CardDescription>
      </CardHeader>

      <CardContent className="h-24">
        <p className="text-gray-500 leading-relaxed tracking-tight">
          {todo.content.length >= 200
            ? todo.content.slice(0, 150) + "..."
            : todo.content}
        </p>
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Todo</DialogTitle>
              <DialogDescription>
                Update the todo details and save changes.
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
                  className="max-h-40"
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
                onClick={() => editTodo(todo._id, title, content, priority)}
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => deleteTodo(todo._id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
