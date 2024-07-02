import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../store/service/endpoints/auth.endpoint";
import { Loader2 } from "lucide-react"
import AuthGuard from "../../components/Guard/Auth.guard";

const SignUpPage = () => {
  const nav=useNavigate()
  const { toast } = useToast()
  const initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [fun,data] = useSignUpMutation()
  console.log(data)

  const handlerSubmit = async  (value,{resetForm}) => {
     
      await fun(value)
      resetForm()
  };

  const validationSchema = yup.object({
    name: yup.string().required().min(2, "Name should be longer than 2 letter"),
    email: yup
      .string()
      .required("email is required")
      .matches(/@gmail\.com$/, "Email must be a Gmail address")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 letter"),
   password_confirmation: yup
      .string()
      .required("Confirm_password is required")
      .oneOf(
        [yup.ref("password"), null],               // validating with password and confirm_password
        "Confirm password should be math witch password"
      ),
  });

  console.log(data?.error?.data?.message)

  useEffect(() => {

    if(data.error) {
      toast({
        title: "Error from server",
        description: data?.error?.data?.message,
      })
    } else if (data.data) {
      nav("/")
    }
  },[])

  return (
    

    <AuthGuard>
      
      <div className=" w-3/5  mx-auto  flex justify-center items-center  h-screen">
        <Card className=" basis-3/5 ">
          <CardHeader className=" mb-5 flex-row justify-between ">
            <CardTitle>Sign Up</CardTitle>
            <CardDescription className=" text-primary">
              <Link className=" hover:underline duration-200" to={"/"}>Already have an account</Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={validationSchema}
              onSubmit={handlerSubmit}
              initialValues={initialValue}
            >
              {({ handleBlur, handleChange, values, isSubmitting }) => (
                <>
                  <Form  className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      type="text"
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
                      id="Email"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      name="email"
                      component={"p"}
                    />
                    <Label htmlFor="password">Password</Label>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                      name="password"
                      id="Password"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      name="password"
                      component={"p"}
                    />
                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                    <Input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmation}
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                    />
                    <ErrorMessage
                      className=" text-danger text-sm"
                      name="password_confirmation"
                      component={"p"}
                    />

                    <Button
                    
                      
                      type="submit"
                      disabled={isSubmitting}
                      className="  w-full bg-primary"
                    >
                     <p className=" mr-4"> Sign Up </p> {isSubmitting && <Loader2 className="  h-5 w-5 animate-spin" />}
                    </Button>
                     
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>
        </Card>

        
      </div>
    

    </AuthGuard>





  );
};

export default SignUpPage;
