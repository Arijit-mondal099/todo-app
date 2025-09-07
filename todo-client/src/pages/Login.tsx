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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { Loader } from "lucide-react";

const Login: React.FC = () => {
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { loading, login, register } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state === "login") {
      await login(email, password);
    } else if (state === "register") {
      await register(name, email, password);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center pt-24 px-2"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            {state === "login"
              ? "Login to your account"
              : "Register to your account"}
          </CardTitle>
          <CardDescription>
            {state === "login"
              ? "Enter your email and password below to login to your account"
              : "Enter your name, email and password below to register to your account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {state === "register" && (
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Jhon Doe"
                  required
                />
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="*******"
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                loading...
              </span>
            ) : (
              state
            )}
          </Button>

          <div className="flex items-center">
            <p>{state ==="login" ? "Don't have an account?" : "Have an account?"}</p>
            <Button
              variant="link"
              onClick={() => setState(state === "login" ? "register" : "login")}
            >
              {state === "login" ? "Register" : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Login;
