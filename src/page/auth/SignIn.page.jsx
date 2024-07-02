import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../store/service/endpoints/auth.endpoint";

import { Loader2 } from "lucide-react";
import AuthGuard from "../../components/Guard/Auth.guard";

const SignInPage = () => {
  const nav = useNavigate()
  const initialValue = {
    email: "",
    password: "",
  };

  const [fun, data] = useSignInMutation();

  useEffect(() => {
if(data?.data?.success) {
     nav("/home")
     
    };
   
  },[data])
  

  const handlerSubmit = async (value, { resetForm }) => {
    await fun(value);
    resetForm();

    
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .matches(/@gmail\.com$/, "Email must be a Gmail address")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 letter"),
  });

  return (
    <AuthGuard check={data?.data?.success} token={data?.data?.token}> 
    <div className=" w-3/5  mx-auto  flex justify-center items-center  h-screen">
      <Card className=" basis-3/5 ">
        <CardHeader className=" mb-5 flex-row justify-between ">
          <CardTitle>Sign In</CardTitle>
          <CardDescription className=" text-primary">
            <Link className=" hover:underline duration-200" to={"/signup"}>
              I don't have an account
            </Link>
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
                <Form className="flex flex-col gap-4">
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

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="  w-full bg-primary "
                  >
                    <p className=" mr-4"> Sign in </p>{" "}
                    {isSubmitting && (
                      <Loader2 className="  h-5 w-5 animate-spin" />
                    )}
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

export default SignInPage;
