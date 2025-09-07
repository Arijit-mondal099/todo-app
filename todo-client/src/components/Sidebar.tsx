import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, User, Settings, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Todo</SheetTitle>
        </SheetHeader>

        <nav className="grid flex-1 auto-rows-min gap-4 px-4">
          <Link
            to="/"
            className="flex items-center gap-2 border rounded-lg px-4 py-2"
            onClick={() => setOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span className="text-sm font-semibold">Home</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 border rounded-lg px-4 py-2"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" />
            <span className="text-sm font-semibold">Profile</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 border rounded-lg p-3"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-semibold">Setting</span>
          </Link>
        </nav>

        <SheetFooter className="text-center text-gray-500">
          <Button variant={"destructive"}>
            <LogOutIcon />
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
