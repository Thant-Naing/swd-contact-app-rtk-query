import React from 'react';
import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className=' flex h-screen justify-center items-center content-center'><Loader2 className=" text-blue-500 h-8 w-8 animate-spin" /></div> 
  )
}

export default Loading