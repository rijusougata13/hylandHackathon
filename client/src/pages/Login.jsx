import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { LHC, LG, LGsvg } from "../images";

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const theme = useTheme();
  return (
        // #2699ad
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#d0eaef",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232699ad' fill-opacity='0.36'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <Box
        borderRadius={theme.shape.borderRadius}
        sx={{
          width: theme.breakpoints.values.sm,
          bgcolor: "#EFF3F4",
          padding: " 3rem 2rem",
        }}
      >
        <Box textAlign="center" marginBottom="1rem">
          <img src={LHC} alt="Logo" style={{width: "12em"}} />
        </Box>
        {isLoginForm ? (
          <Typography variant="h5" >Login to your account</Typography>
        ) : (
          <Typography variant="h5">Create a new account</Typography>
        )}
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
        {isLoginForm ? (
          <Box textAlign="center" margin=".5rem 0">
            Don't have an account?{" "}
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setIsLoginForm(false)}
            >
              Create one
            </Link>
          </Box>
        ) : (
          <Box textAlign="center" margin=".5rem 0">
            Already registered?{" "}
            <Link
              style={{ textDecoration: "none", cursor: "pointer" }}
              onClick={() => setIsLoginForm(true)}
            >
              Sign in
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
