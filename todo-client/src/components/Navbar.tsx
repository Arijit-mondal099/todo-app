import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LogOutIcon, Zap } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppContext } from "@/context/AppContext";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const { token, logout } = useAppContext();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-1">
              <Zap className="h-6 w-6" />
              <h1 className="font-medium text-2xl">Todo</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <ModeToggle />
                </NavigationMenuItem>

                {token && (
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink>
                      <Link to={"/"} className="font-medium">
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                {token && (
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[300px] gap-3 p-4">
                        <NavigationMenuLink asChild>
                          <Link to={"/"}>
                            <div className="text-sm font-medium leading-none">
                              Web Apps
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Modern web applications built with React
                            </p>
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link to={"/"}>
                            <div className="text-sm font-medium leading-none">
                              Mobile Apps
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Cross-platform mobile solutions
                            </p>
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link to={"/"}>
                            <div className="text-sm font-medium leading-none">
                              APIs
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              RESTful and GraphQL API services
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {token && (
                  <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[300px] grid gap-2">
                        <NavigationMenuLink asChild>
                          <Link to={"/"}>Home</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to={"/"}>Profile</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link to={"/"}>Setting</Link>
                        </NavigationMenuLink>
                        
                        <Button variant={"destructive"} onClick={logout}>
                          <LogOutIcon />
                          Logout
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}

                {token && (
                  <NavigationMenuItem className="md:hidden">
                    <Sidebar />
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
