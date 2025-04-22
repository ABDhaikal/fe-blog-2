import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/user";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const useLogin = () => {
   const router = useRouter();
   const dispatch = useAppDispatch();
   return useMutation({
      mutationFn: async (payload: Pick<User, "email" | "password">) => {
         const { data } = await axiosInstance.post(`/auth/login`, {
            email: payload.email,
            password: payload.password,
         });
         return data;
      },
      onSuccess: (data) => {
         dispatch(loginAction(data));
         localStorage.setItem("accessToken", JSON.stringify(data));
         alert("User logged in successfully");
         router.push("/");
      },
      onError: (error: AxiosError<{ message: string; code: number }>) => {
         alert(error.response?.data.message);
      },
   });
};

export default useLogin;
