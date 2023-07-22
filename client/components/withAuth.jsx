import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./spinners/Loading";
import { setCredentials } from "../store/authSlice";
export const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const auth = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      // Check if the user is authenticated (example: check if user session exists)
      //   const isAuthenticated = !!localStorage.getItem("user"); // Replace with your authentication check

      const authStorage = localStorage.getItem("auth");
      if (authStorage) dispatch(setCredentials(authStorage));

      if (!auth.isAuthenticated) {
        router.push("/login"); // Redirect to the login page if not authenticated
      }
    }, []);

    if (!auth.isAuthenticated) {
      return <Loading />;
    }

    if (typeof window === "undefined") {
      return <></>; // Render nothing on the server side
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};
