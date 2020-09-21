import React, { useState, useEffect, useContext, createContext } from "react";
import firebase, { authApp } from "@Services/firebase/client";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

export const withAuth = (Component) => {
  return (props) => {
    var auth = useAuth();
    return <Component auth={auth} {...props} />;
  };
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return authApp.auth().createUserWithEmailAndPassword(email, password);
  };

  const signupWithGoogle = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return authApp.auth().signInWithRedirect(googleProvider);
  };

  const signinWithProvider = (provider) => {
    switch (provider) {
      case "google": {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithRedirect(googleProvider);
      }
    }
  };

  const signinWithCredential = (credential) => {
    return firebase.auth().signInWithCredential(credential);
  };

  const registerMWL = (usr, pw) => {
    if (authApp.auth().currentUser) {
      let uid = authApp.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(uid).set({
        mwl_u: usr,
        mwl_p: pw,
      });
    }
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(false);
      }
      setIsLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
    signin,
    signinWithProvider,
    signinWithCredential,
    signup,
    signupWithGoogle,
    signout,
    registerMWL,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
