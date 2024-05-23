"use client";
import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "../../utils/validation";
import { saveToken } from "../../utils/storage";
import axios, { AxiosResponse } from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Check, Star, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const Page = () => {
  const router = useRouter();

  const [localhost, setLocalHost] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalHost({ ...localhost, [name]: value });
  };

  const handleClick = async () => {
    setErrors({
      email: "",
      password: "",
    });

    let hasError = false;

    if (!isValidEmail(localhost?.email)) {
      toast.error("Please enter a valid email");
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      hasError = true;
    } else if (localhost?.password === "") {
      toast.error("Please enter your password");
      setErrors({
        ...errors,
        password: "Please enter your password",
      });
      hasError = true;
    } else {
      try {
        const res: AxiosResponse = await axios.post(
          "http://194.163.45.154:3120/auth/login",
          {
            username: localhost.email,
            password: localhost.password,
          }
        );
        if (res.status === 200) {
          if (res?.data?.token) {
            saveToken(res?.data?.token);
            router.push("/localhost/home");
          }
        }
      } catch (err: any) {
        const errMsg = Array.isArray(err.response.data.message)
          ? err.response.data.message[0]
          : err.response.data.message;
        toast.error(errMsg);
      }
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="w-full flex justify-center py-4">
        <div className="w-full md:max-w-xl col-span-full lg:col-span-1 flex flex-col bg-white shadow-md rounded-md">
          <ScrollArea className="relative flex-1 overflow-auto">
            <div
              aria-hidden="true"
              className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
            />

            <div className="px-8 pb-12 pt-12">
              <h2 className="tracking-tight font-bold text-3xl">
                Login Last Minute Local Host
              </h2>

              <div className="w-full h-px bg-zinc-200 my-6" />

              <div className="relative mt-4 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  <div className="relative flex flex-col gap-1 w-full">
                    <Label className={`${errors?.email && "text-red-600"}`}>
                      Email
                    </Label>
                    <Input
                      name="email"
                      className={`${errors?.email && "text-red-600"}`}
                      type="email"
                      value={localhost?.email}
                      onChange={handleChange}
                    />
                    {errors?.email && (
                      <p className="text-red-600 text-xs italic">
                        {errors?.email}
                      </p>
                    )}
                  </div>

                  <div className="relative flex flex-col gap-1 w-full">
                    <Label className={`${errors?.password && "text-red-600"}`}>
                      Password
                    </Label>
                    <Input
                      name="password"
                      className={`${errors?.password && "text-red-600"}`}
                      type="password"
                      value={localhost?.password}
                      onChange={handleChange}
                    />
                    {errors?.password && (
                      <p className="text-red-600 text-xs italic">
                        {errors?.password}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="w-full px-8 bg-white pb-12 rounded-md">
            <div className="w-full h-full flex justify-end items-center">
              <div className="w-full flex justify-center gap-6 items-center">
                {/* <p className="font-medium whitespace-nowrap">
              {formatPrice(
                (BASE_PRICE +
                  options.finish.price +
                  options.material.price) /
                  100
              )}
            </p> */}
                <Button
                  disabled={isPending}
                  onClick={handleClick}
                  size="sm"
                  className="text-sm px-10"
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center py-2">
              <p className="text-sm mr-2">Forgot password? </p>
              <p className="text-sm text-blue-700 cursor-pointer underline">
                Click here
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
