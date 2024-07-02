import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../../components/ui/table.jsx";
  import { MdOutlineDeleteOutline } from "react-icons/md"
  import { MdOutlineEdit } from "react-icons/md";
  import Swal from 'sweetalert2'
import { useDeleteMutation } from '../../../store/service/endpoints/contant.endpoint.js';
import {
  
   SheetTrigger,
 } from "../../../components/ui/sheet.jsx"

const DataTableTool = ({data,setIsEdit,isEdit}) => {
     const [deleFun,{isError,isLoading,isSuccess}] = useDeleteMutation()
//   console.log(isError,isLoading,isSuccess)
   
     

 const handlerDele = async (id) => { 
   Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#387ADF",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
          await deleFun(id)   
        Swal.fire({
          title: "Deleted!",
          text:  ` id ${id} has been deleted.`,
          icon: "success"
        });
      }
    });
 }
 
 const handlerUpdate = (id) => {
   setIsEdit({edit:true,id})
   // const finder = data.find((li) => li.id == id )
   //  console.log("update",id)
 
 }

  return (
       <Table>
           <TableHeader className="">
                <TableRow className=" bg-blue-500 hover:bg-blue-500">
                    <TableHead className=" rounded-l-xl">No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className=" text-end">Phone</TableHead>
                    <TableHead>Address</TableHead>
                   <TableHead className=" rounded-r-xl">Action</TableHead>

                </TableRow>
           </TableHeader>

             <TableBody>

                {data.map((cell,index) => <TableRow key={cell.id}>
                    <TableCell>{cell.id}</TableCell>
                    <TableCell>{cell.name}</TableCell>
                    <TableCell>{cell.email}</TableCell>
                    <TableCell className=" text-end">{cell.phone}</TableCell>
                    <TableCell className=" text-start">{cell.address}</TableCell>

                    <TableCell className=" flex items-center gap-10">
                        
                    <SheetTrigger> <MdOutlineEdit onClick={() => handlerUpdate(cell.id)} className=' text-gray-500 size-6' /></SheetTrigger>
                    <MdOutlineDeleteOutline onClick={() => handlerDele(cell.id)} className=' text-red-500 size-6' />

                    </TableCell>
                   
                </TableRow> )}
                
             </TableBody>
       </Table>
  )
}

export default DataTableTool