import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfileQuery } from '../../store/service/endpoints/auth.endpoint';

import Loading from '../loading/Loading';

const AuthGuard = ({check,children,token}) => {
  const nav = useNavigate()
    
   const {data,isError ,isLoading,error}= useProfileQuery()
   useEffect(() => {
      //  console.log(data,isError,isLoading)

      if(check){
         localStorage.setItem("token",JSON.stringify(token))
      } else if (isError) {
        // localStorage.removeItem("token")
        console.log(error)
        nav("/")
      } else if (data) {
        nav("/home")
      }

     },[check,data,isError])

  return (
    <>
    {isLoading ? <Loading/> : <>{children}</>}

    </>
    
  )
}

export default AuthGuard