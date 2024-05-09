import { useForm} from "react-hook-form";
import { useMutation,useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link, useLocation} from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
}



const SignIn = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();//library for fetching, caching, and updating data in React applications. Here is it used to update UI to reflect the latest data

  const {showToast} = useAppContext();
  const {register,
        formState:{errors},
        handleSubmit
      } =useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn,{
    onSuccess : async () =>{
      console.log("User logged in");
      
      //1. show the toast
      showToast({message: "Sign in Successful!", type: "SUCCESS"});
      //2. update UI
      await queryClient.invalidateQueries("validateToken");
      //2. navigate to the home page is there is no previous location
      navigate(location.state?.from?.pathname || "/");

    },
    onError: (error: Error) =>{
      //show the toast
       showToast({message: error.message, type:"ERROR"});
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

       

        <span className="flex items-center justify-between">
          <span className="text-xs lg:text-sm">Not Registered? <Link className="underline" to="/register">Create an account here</Link></span>
          <button type="submit" className="bg-green-600 rounded-md text-xs text-white p-2 font-bold hover:bg-green-400">Login</button>
        </span>
    </form>
  )
}

export default SignIn