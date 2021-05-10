import React, { useEffect } from "react";
import { auth } from "config.js";
import { useHistory } from "react-router-dom";
import { useAuth } from "contexts";
// @material-ui/core components

export default function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const handleLogin = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      const hasAuth = await auth().signInWithPopup(provider);
      console.log(process.env.EMAIL_LOGIN);
      if (
        hasAuth.additionalUserInfo.profile.email === "nevermind271999@gmail.com"
      ) {
        login(hasAuth);
        history.push("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleLogin();
  });
  return <div>Login</div>;
}
