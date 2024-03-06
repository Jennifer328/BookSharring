import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}


const Toast = ({message, type, onClose}: ToastProps) => {

  useEffect(() =>{
    const timer =setTimeout(() =>{
       onClose();
    },5000);

    return () =>{
      clearTimeout(timer);
    };
  },[onClose])

  const styles = type ==="SUCCESS"
  ? "absolute top-5 right-4 z-50 p-4 rounded-md bg-orange-900 text-white max-w-sm"
  : "absolute top-5 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-sm"
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  )
}

export default Toast