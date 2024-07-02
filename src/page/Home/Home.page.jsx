import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import {Button} from "../../components/ui/button"
import { FiPlus } from "react-icons/fi";
import EmptyLottie from '../../components/lottieComponents/Empty.lottie';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AuthGuard from '../../components/Guard/Auth.guard';
import FormTool from './tool/Form.tool';
import { useGetQuery } from '../../store/service/endpoints/contant.endpoint';
import DataTableTool from './tool/DataTable.tool';




const HomePage = () => {
  const {data,isError,isSuccess,isLoading} = useGetQuery()
  // console.log(data?.contacts?.data)
  const [isEdit,setIsEdit] = useState({edit : false , id : null})

 

 const editContact = () => {
     const finder = data?.contacts?.data.find((li) =>  li.id ==  isEdit.id)
     return finder
 }


  return (
    <AuthGuard>
      <Sheet>
    <div className=' w-screen h-screen  bg-[#fcfcfd] '>
        <Nav/>
        <div className=' px-52 mx-auto  '>
            
            <div className=' flex justify-end mb-2'>
            <SheetTrigger > 
               <div className=' hover:bg-blue-400 mt-5 rounded-lg px-2  text-white py-2 bg-blue-500'>
                <div onClick={() => setIsEdit({edit:false,id:null})} className=' flex items-center space-x-2'><FiPlus /><p>Create Content</p></div></div>
           </SheetTrigger>
            </div>
            <div className='   '>

              {data?.contacts?.data.length > 0 ?  <DataTableTool isEdit={isEdit} setIsEdit={setIsEdit} data={data?.contacts?.data}/> :  <EmptyLottie/>}

             
              
             



            </div>
        </div>

        <SheetContent>
    <SheetHeader>
      <SheetTitle>Content Information</SheetTitle>
      <SheetDescription>
        <FormTool isEdit={isEdit} getEdit={data?.contacts?.data} editContact={editContact} setIsEdit={setIsEdit} />
          {/* <Button className=" bg-blue-500 text-white hover:bg-blue-400">Save Change</Button> */}
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
    </div>
    </Sheet>
    </AuthGuard>
  )
}

export default HomePage