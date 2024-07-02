import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserLogoutMutation } from "../../store/service/endpoints/auth.endpoint";
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom";


const Nav = () => {
  const nav = useNavigate()
  const [logOutFun,{isSuccess}]  = useUserLogoutMutation()

  isSuccess && toast.success('logout successful')

  const handlerLogout = async () => {
    
    await logOutFun()
    localStorage.removeItem("auth")
    nav("/")

  }
  console.log(isSuccess)
  return (
    <div className=" px-52 w-full h-20 bg-white  flex mx-auto items-center ">
         <div className=" flex items-center justify-between w-full border-b border-blue-700 pb-5 ">
         <h1 className=" font-test text-4xl text-gray-600 font-semibold">Content</h1>
      <div className=" flex gap-3">
         <button onClick={handlerLogout} type="button " className="px-2 py-1 text-white bg-blue-500 rounded-lg">Logout</button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DV</AvatarFallback>
        </Avatar>
       
      </div>
         </div>
    
    </div>
  );
};

export default Nav;
