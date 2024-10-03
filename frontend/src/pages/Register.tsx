import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";

import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {

  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,


}




const Register = () => {

  const QueryClient = useQueryClient();
  const { showToast } = useAppContext();
const navigate =   useNavigate();

  const { register, watch,
    handleSubmit,
    formState: { errors },

  } = useForm<RegisterFormData>();


  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
await QueryClient.invalidateQueries("validateToken");
  showToast({message:"Register Sucessfully Registered" , type: "SUCCESS" });
  navigate("/");
    },


    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  })

  
  const onsubmit = handleSubmit((data) => {


mutation.mutate(data);
    // make API call to save data
  });



  return (
    <form className="flex flex-col gap-5" onSubmit={onsubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-500 text-sm font-bold flex-1">
        password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "password must be at least 6 characters"
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

      </label>
      <label className="text-gray-500 text-sm font-bold flex-1">
        confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {

              if (!val) {

                return "this field is requires a password";

              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Create Account
        </button>
      </span>





    </form>
  )
}

export default Register