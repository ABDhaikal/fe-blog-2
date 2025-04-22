import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface RegisterPayload {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

const useRegister = () => {
   const router = useRouter();

   return useMutation({
      mutationFn: async (payload: RegisterPayload) =>{
         await axiosInstance.post(`/auth/register`, {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password,
         })},
      onSuccess: () => {
         alert("User registered successfully");
         router.push("/login");
      },
      onError: (error: AxiosError<{ message: string; code: number }>) => {
         alert(error.response?.data.message);
      },
   });
};

export default useRegister;
