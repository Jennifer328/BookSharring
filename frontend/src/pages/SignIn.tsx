import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";

export type SignInFormData = {
  email: string;
  password: string;
}



const SignIn = () => {
  const {register,
        formState:{errors},
        handleSubmit
      } =useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn,{
    onSuccess : async () =>{
      console.log("User logged in");
      
      //1. show the toast
      //2. navigate to the home page
    },
    onError: (error: Error) =>{
      //show the toast
    }
  });
  
  const onSubmit = handleSubmit((data) =>{
    mutation.mutate(data);
  })

  return (
    <form className="flex flex-col gap-2 lg:gap-5 max-w-lg justify-center mx-auto" onSubmit={onSubmit}>

       <h2 className="text-3xl font-bold mb-5">Sign In</h2>
       <label className="text-gray-500 text-sm font-bold flex-1">Email
           <input className="border rounded w-full py-1 px-2 font-normal" {...register("email",{required: "This field is required"})} type="email" />
           {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
        </label>

        <label className="text-gray-500 text-sm font-bold flex-1">Password
           <input className="border rounded w-full py-1 px-2 font-normal" 
           {...register("password",{required: "This field is required",minLength:{value:6,
            message:"Password must be at least 6 characters"}})} type="password" />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
        </label>

       

        <span>
          <button type="submit" className="bg-green-600 rounded-md text-xs text-white p-2 font-bold hover:bg-green-400">Login</button>
        </span>
    </form>
  )
}

export default SignIn