// src/page/auth/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu, login, setAuthData } from "@/redux/slices/authSlice";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Lock, User } from "lucide-react";

const formSchema = z.object({
  username: z.string("Username is required").min(1, {
    message: "Username is required",
  }),
  password: z.string("Password is required").min(1, {
    message: "Password is required",
  }),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "fe.it.pml",
      password: "Password123?",
      rememberMe: true,
    },
  });

  const { loading } = useSelector((state) => state.auth);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const { payload: data } = await dispatch(login(values));
      const authData = data;

      dispatch(setAuthData(authData));

      const now = Date.now();
      // authData.token.expiresIn = now + authData.token.expiresIn * 1000;
      localStorage.setItem(
        "auth_data",
        JSON.stringify({
          ...authData,
          token: {
            ...authData.token,
            expiresIn: now + authData.token.expiresIn * 1000,
          },
        })
      );

      const { payload: menu } = await dispatch(fetchMenu());

      localStorage.setItem("menu", JSON.stringify(menu.nestedMenu));
      localStorage.setItem("flat_menu", JSON.stringify(menu.flatMenu));

      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[407px]"
      >
        <Card bordered shadow={false} className="w-full">
          <CardHeader className="flex-row justify-center">
            <Image
              className="inline-block"
              src="/logo-kalbe.png"
              width={113}
              height={51}
              alt="Logo PT. Kalbe Farma Tbk"
            />
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="shadcn" {...field} /> */}
                      <Input
                        placeholder="Username"
                        startAdornment={<User size={18} />}
                        borderedStartAdorment
                        disabled={loading}
                        bounceTime={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        startAdornment={<Lock size={18} />}
                        borderedStartAdorment
                        disabled={loading}
                        bounceTime={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="grid mt-2 px-4 md:px-8">
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              loadingText="Logging In"
            >
              Login
            </Button>

            {error && <p className="text-danger mt-2 text-sm">{error}</p>}
            <div className="text-sm text-center text-foreground mt-24 pt-3 border-t border-border">
              <p>PML Version 1.0.0</p>
              <p>&copy;{new Date().getFullYear()} - PT. Kalbe Farma Tbk.</p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

Login.layout = "auth";

export default Login;
