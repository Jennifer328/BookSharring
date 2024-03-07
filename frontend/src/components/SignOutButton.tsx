import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {

  const queryClient = useQueryClient();

  const {showToast} = useAppContext();

  const mutation = useMutation(apiClient.signOut,{
       onSuccess: async ()=>{

        await queryClient.invalidateQueries("validateToken");//if this missing the UI will not changed to signin after signed out
        //showToast
        showToast({message:"User logged out", type:"SUCCESS"});
       },
       onError:(error: Error)=>{
         showToast({message:error.message, type:"ERROR"})
       }
  });

  const handleClick = () =>{
    mutation.mutate();
  }

  return (
    <button 
    onClick={handleClick}
    className="bg-green-600 rounded-md text-xs text-white p-2 font-bold hover:bg-green-400"
    >Logout
    </button>
  )
}

export default SignOutButton;