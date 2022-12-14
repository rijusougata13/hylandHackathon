import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { registerUser } from "../redux/authSlice";

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    name: "",
    handle: "",
    email: "",
    password: "",
    loginAs: ""
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, isLoggedIn } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState('doctor');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerData)
    dispatch(registerUser(registerData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name="name"
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter full name"
        type="text"
        required
      />
      <TextField
        name="handle"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Choose an handle"
        type="text"
        required
      />
      <TextField
        name="email"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Email"
        type="email"
        required
      />
      <TextField
        name="password"
        onChange={(e) =>
          setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        sx={{ width: "100%", margin: "1rem 0", bgcolor: "#fff" }}
        variant="outlined"
        label="Enter Password"
        type="password"
        required
      />
       <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Login as</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="patient"
        name="loginAs"
        value={value}
        onChange={(e) =>
          {setValue(e.target.value);
            console.log(e.target.value);
            setRegisterData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))}
        }
     
     >
        <FormControlLabel value="patient" control={<Radio />} label="Patient" />
        <FormControlLabel value="doctor" control={<Radio />} label="Doctor" />
        {/* <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
      </RadioGroup>
    </FormControl>
      <Button
        disabled={
          registerData.email.trimStart().length === 0 ||
          registerData.password.trimStart().length === 0 ||
          registerData.handle.trimStart().length === 0 ||
          registerData.name.trimStart().length === 0
        }
        type="submit"
        sx={{
          width: "100%",
          margin: "1.5rem 0",
          padding: "12px 0",
          borderRadius: "28px",
        }}
        variant="contained"
        color="primary"
      >
        {status === "loading" ? (
          <CircularProgress size={24} sx={{ color: "#FFF" }} />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
