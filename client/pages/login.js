"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import loginImage from "../public/images/loginImage.png";
import { useRouter } from "next/router";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function that handle login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("http://127.0.0.1:8000/api/auth/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          router.push("/");

          localStorage.setItem("auth", {
            user: response.data.data.user,
            jwt: response.data.data.jwt,
            isAuthenticated: true,
          });

          dispatch(
            setCredentials(response.data.data.user, response.data.data.jwt)
          );

          // Handle the successful response
        } else if (response.status === 400) {
          setErrorMessage(response.data.data.message);
          setShowAlert(true);

          // Handle the 400 error
        } else if (response.status === 401) {
          setErrorMessage(response.data.message);
          setShowAlert(true); // Handle the 401 error
        } else if (response.status === 403) {
          setErrorMessage(response.data.message);
          setShowAlert(true); // Handle the 403 error
        }
      })
      .catch((error) => {
        console.log("Error");
        console.log(error);
        // setErrorMessage(error.response.data.message);
        // setShowAlert(true);
      });
  };

  // Function that handle onchange
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="bg-blue-50 w-screen h-screen flex justify-center items-center flex-col">
      {showAlert ? (
        <Alert
          color="failure"
          className="my-4 w-1/3"
          onDismiss={(e) => setShowAlert(false)}
        >
          <span>
            <p>
              <span className="font-medium">Error! </span>
              {errorMessage}
            </p>
          </span>
        </Alert>
      ) : (
        ""
      )}

      <div className=" w-1/3 bg-white rounded-xl">
        <h1 className=" text-[30px] text-center text-white font-bold mb-6  p-8 rounded-t-xl  bg-blue-500">
          Donation Management System
        </h1>

        <div className="p-16 pt-4">
          <div className="text-2xl font-bold text-center mb-12">Login</div>

          <form
            onSubmit={handleLoginSubmit}
            className="flex max-w-md flex-col gap-4 bg-white "
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
                value={user.email}
                placeholder="name@gmail.com"
                onChange={(e) => handleInputChange(e)}
                required
                type="email"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                name="password"
                value={user.password}
                onChange={(e) => handleInputChange(e)}
                required
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>

            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
