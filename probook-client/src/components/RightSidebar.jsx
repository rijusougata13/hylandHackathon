import { Search } from "@mui/icons-material";
import { Input, Typography, Grid, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhoToFollow from "./WhoToFollow";
import WhoToAppoint from './WhoToAppoint'
import { Link, useParams } from "react-router-dom";
import { getFollowings,getFollowers } from "../redux/followSlice";
import { getProfile } from "../redux/authSlice";

export default function RightSidebar() {
  const [query, setQuery] = React.useState("");
  const { _id } = JSON.parse(localStorage.getItem("login"));
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfile(_id));
  }, [dispatch, _id]);
  useEffect(() => {
    dispatch(getFollowings(_id));
  }, [dispatch, _id]);
  useEffect(() => {
    dispatch(getFollowers(_id));
  }, [dispatch, _id]);
  const { users, userStatus,profile } = useSelector((state) => state.auth);
  const { followingStatus, followings,followers } = useSelector((state) => state.follow);
 
  // console.log(profile)
  const [loginAs,setLoginAs] = useState(profile?.userId?.loginAs)
  useEffect(()=>{
    setLoginAs(profile?.userId?.loginAs)
  })
  function queriedUsers() {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.handle.toLowerCase().includes(query.toLowerCase())
    );
  }
console.log(loginAs)
 

  function showFollowers() {
    const filtered = users.filter((user) => user._id !== _id);
   
    //for doctors
    return filtered.filter((item) => {
      const index = followers.findIndex(
        (follow) => follow.followerId !== item._id
      );
      if (index !== -1) {
        return false;
      }
      return true;
    });
  }


  function showFollowing() {
    const filtered = users.filter((user) => user._id !== _id);
// console.log(followings)
//for patients
    return filtered.filter((item) => {
      const index = followings.findIndex(
        (follow) => follow.followingId === item._id
      );
      if (index !== -1) {
        return false;
      }
      return true;
    });
  }

  return (
    <Box sx={{ height: "100%" }}>
      
      <Box paddingTop="10px">
        <Box
          width="100%"
          borderRadius="28px"
          border="1px solid #eee"
          position="relative"
          sx={{
            background: "#eee",
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            inputProps={{
              style: { padding: "10px" },
            }}
            disableUnderline
            fullWidth
            placeholder="Search"
            startAdornment={
              <Search
                sx={{
                  paddingLeft: "20px",
                  color: "#777",
                }}
              />
            }
          />
          {query.length !== 0 && (
            <Box
              width="100%"
              sx={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "28px",
                padding: "1rem 0",
                zIndex: "999",
                maxHeight: "50vh",
                overflowY: "scroll",
              }}
              position="absolute"
            >
              {query.length !== 0 && queriedUsers().length === 0 && (
                <Typography sx={{ padding: "0 1rem" }}>
                  No users found!
                </Typography>
              )}
              {queriedUsers().map((user) => (
                <Box key={user._id}>
                  <Link
                    onClick={() => setQuery("")}
                    style={{ textDecoration: "none" }}
                    to={`/profile/${user._id}`}
                  >
                    <Grid
                      sx={{
                        overflow: "hidden",
                        padding: ".2rem 1rem",
                        "&:hover": {
                          backgroundColor: "#eee",
                        },
                      }}
                      container
                      alignItems="center"
                    >
                      <Grid item sx={{ paddingRight: "12px" }}>
                        <img src="/logo.png" width="50px" alt="logo" />
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center">
                          <Grid item>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#000",
                              }}
                            >
                              {user.name}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  mr: "6px",
                                  color: "#555",
                                }}
                              >
                                {user.handle}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            background: "#eee",
            borderRadius: "28px",
            padding: "10px 20px",
            margin: "1rem 0",
          }}
        >
          {loginAs === 'doctor' ? (
         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nearby Appointments 
          </Typography>):(
         <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Nearby Doctors 
          </Typography>)}

          <Box textAlign="center" marginTop="1rem">
            {(userStatus === "loading" || followingStatus === "loading") && (
              <CircularProgress size={20} color="primary" />
            )}
          </Box>

          {userStatus === "success" && loginAs === 'doctor' ? (showFollowers().slice(0, 7).map((item) => item.loginAs === 'patient' && <WhoToAppoint key={item._id} user={item}/>
          )):(showFollowing().slice(0, 7).map((item) => item.loginAs === 'doctor' && <WhoToFollow key={item._id} user={item}/>))}


          {/* {userStatus === "success" &&
            showToFollow()
              .slice(0, 7)
              .map((item) => 
              item.loginAs==='doctor' &&
              
              <WhoToFollow key={item._id} user={item} />)} */}
        </Box>
      </Box>
    </Box>
  );
}
