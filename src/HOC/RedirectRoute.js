import React, { useEffect } from "react";
import { useAuth } from "@Context/AuthContext";
import { useRouter } from "next/router";
import LoadingScreen from "@Components/LoadingScreen";

export default function RedirectRoute(Component, path) {
  return () => {
    const { isAuthenticated, isLoading } = useAuth();

    const Router = useRouter();

    useEffect(() => {
      if (!isLoading && isAuthenticated) Router.push(path || "/app");
    });

    return !isLoading && !isAuthenticated ? <Component /> : <LoadingScreen />;
  };
}
