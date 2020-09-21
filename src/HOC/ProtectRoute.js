import React, { useEffect } from "react";
import { useAuth } from "@Context/AuthContext";
import { useRouter } from "next/router";
import LoadingScreen from "@Components/LoadingScreen";

export default function ProtectRoute(Component, path) {
  return (props) => {
    const { isAuthenticated, isLoading } = useAuth();
    const Router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) Router.push(path ? path : "/login");
    });

    return !isLoading && isAuthenticated ? (
      <Component {...props} />
    ) : (
      <LoadingScreen />
    );
  };
}
