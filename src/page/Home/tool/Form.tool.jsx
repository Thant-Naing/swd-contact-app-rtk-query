import React, { useEffect, useRef, useState } from 'react';
import * as yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateMutation, useUpdateMutation } from '../../../store/service/endpoints/contant.endpoint';
import {SheetClose} from "../../../components/ui/sheet";
import Swal from 'sweetalert2'
 

const FormTool = ({isEdit,setIsEdit,getEdit,editContact}) => {
  
   
          const finder = editContact()
   
  const initialValue = {
    name: isEdit.edit ? finder.name : "" ,
    phone: isEdit.edit ? finder.phone : "",
    email : isEdit.edit ? finder.email : "",
    address : isEdit.edit ? finder.address : ""
  };



  const closeRef = useRef()

  const [fun,{isError,isLoading,isSuccess,data} ] = useCreateMutation()
  const [updateFun,upDatingState] =useUpdateMutation()

  const validationSchema =yup.object({
    name : yup.string().required("name is required").min(3,"name must be 3 length"),
    email : yup.string().required("email is required").email("that should be email format"),
    phone : yup.string().min(9,"phone number should be at least 9 number").required("phone is required").max(12,"phone number should be lower than 12 number"),
    address : yup.string().required("address is required")
  })

   console.log(upDatingState)

 if(upDatingState.isSuccess) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your contact has been updated",
          showConfirmButton: false,
          timer: 1500
        });
      }

      if(isSuccess) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your new contact has been created",
          showConfirmButton: false,
          timer: 1500
        });
      }

  const handlerSubmit = async (value, { resetForm }) => {
     
   if(isEdit.edit) {
       await updateFun({...value,id:isEdit.id});
      console.log(isEdit.id,value)
      
      setIsEdit(() => ({edit : false,id:null}) )
      closeRef?.current.click()
     

   } else {

    await fun(value)
    resetForm();
    // alert(isError)
    
      closeRef?.current.click()
   }
    

       
    
  };

  

  return (
    <> <Formik
    validateOnBlur={false}
    validateOnChange={false}
    validationSchema={validationSchema}
    onSubmit={handlerSubmit}
    initialValues={initialValue}
  >
    {({ handleBlur, handleChange, values, isSubmitting }) => (
      <div className=''>
        <Form className="flex flex-col h-[700px]  gap-4">
          <Label htmlFor="name">Name</Label>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            type="name"
            name="name"
            id="name"
          />
          <ErrorMessage
            className=" text-danger text-sm"
            name="name"
            component={"p"}
          />
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            name="email"
            id="email"
          />
          <ErrorMessage
            className=" text-danger text-sm"
            name="email"
            component={"p"}
          />
           <Label htmlFor="phone">Phone</Label>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            type="phone"
            name="phone"
            id="phone"
          />
          <ErrorMessage
            className=" text-danger text-sm"
            name="phone"
            component={"p"}
          />
           <Label htmlFor="address">Address</Label>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            type="address"
            name="address"
            id="address"
          />
          <ErrorMessage
            className=" text-danger text-sm"
            name="address"
            component={"p"}
          />

          <div className=' mt-auto flex justify-between gap-2'>
            
         <SheetClose ref={closeRef} className=' w-full'>
         <Button 
          variant="outline"
            type="button"
            disabled={isSubmitting}
            className=" w-full  text-primary border border-primary  "
          >
            <div className=" mr-4">  Cancel </div>
          
          </Button>
         </SheetClose>
         
          {isEdit.edit ? 
          <Button
            type="submit"
            disabled={isSubmitting}
            className="  bg-primary w-full "
          >
            <div className=" mr-4">  Update </div>
            {upDatingState.isLoading && (
              <Loader2 className="  h-5 w-5 animate-spin" />
            )}
          </Button> : 
          <Button
            type="submit"
            disabled={isSubmitting}
            className="  bg-primary w-full "
          >
            <div className=" mr-4">  Create </div>
            {isLoading && (
              <Loader2 className="  h-5 w-5 animate-spin" />
            )}
          </Button> } 

          </div>
        </Form>
      </div>
    )}
  </Formik></>
  )
}

export default FormTool