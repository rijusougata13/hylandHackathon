import React, { useState,useEffect } from "react";
import { Box } from "@mui/system";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Post from "../components/Post";
import { addComment, addResearch, deletePost, likeOrDislikePost } from "../api";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProfile } from "../redux/authSlice";
import { Link as RouteLink } from "react-router-dom";
import { getFollowers, getFollowings } from "../redux/followSlice";
import {
  followAccount,
  followingAccount,
  unfollowAccount,
  unfollowingAccount,
} from "../api";
import format from "date-fns/format";
import Modal from "../components/Modal";
const Research = () => {
    const { profile, status } = useSelector((state) => state.auth);
    const theme = useTheme();
    const [commentText, setCommentText] = useState("");
    const { postDetails } = useSelector(
        (state) => state.post
      );
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleAddResearch = async () => {
    const response = await addResearch({ id: postDetails._id, text: commentText });
    if (response) {
      setCommentText("");
    }
  };


  const handleModalOpen = () => {
    setOpenModal(true);
  };
  return (
    <div>
        {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Comment"}
          len={commentText.trimStart().length}
          handleSave={handleAddResearch}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src="/logo.png" alt="logo" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Post your comment"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>)}
       <Box>
      <Box borderBottom="1px solid #ccc" padding="8px 20px">
        <Grid container position='relative' alignItems="center">
          <Grid item sx={{ mr: "10px" }}>
            <RouteLink to="/">
              <IconButton>
                <ArrowBackIcon />
              </IconButton>
            </RouteLink>
          </Grid>
              {status === "success" && (
            <Grid item>
              <Typography variant="h6">
                {profile.userId && profile.userId && profile.userId.name}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#555" }}>
                {profile.posts && profile.posts.length} posts
              </Typography>{" "}
              
            </Grid>
            
          )}
          <Button
          style={{
           position: "absolute",
           right: 0,
           
          }}
          
          onClick={handleModalOpen}>
                ADD Research
              </Button>
        </Grid>
      </Box>
      <Box textAlign="center">
        {status === "loading" && (
          <Box marginTop="1rem">
            <CircularProgress size={20} color="primary" />
          </Box>
        )}
      </Box>
      {status === "success" && (
        <Box height="90vh" sx={{ overflowY: "scroll" }}>
          <Box position="relative">
            <img
              width="100%"
              src={profile.backgroundImageUrl}
              alt="background"
            />
            <Box
              sx={{
                position: "absolute",
                top: 120,
                left: 15,
                background: "#eee",
                borderRadius: "50%",
              }}
            >
              <img width="150px" src={profile.profileImageUrl} alt="profile" />
            </Box>
          </Box>
          <Box textAlign="right" padding="10px 20px">
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
            <IconButton>
              <MailOutlineIcon />
            </IconButton>
            {/* {!hideFollow() && isFollowVisible() && (
              <Button
                onClick={handleFollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Follow
              </Button>
            )} */}

            {/* {!hideFollow() && !isFollowVisible() && (
              <Button
                onClick={handleUnfollow}
                size="small"
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  textTransform: "capitalize",
                  padding: "6px 20px",
                  background: "black",
                  "&:hover": {
                    background: "#333",
                  },
                }}
                variant="contained"
              >
                Unfollow
              </Button>
            )} */}
          </Box>
          <Box padding="10px 20px">
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {profile.userId && profile.userId.name}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              @{profile.userId && profile.userId.handle}
            </Typography>
            <Typography fontSize="16px" color="#333" padding="10px 0">
              {profile.bio}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              padding="6px 0"
              flexWrap="wrap"
            >
              <Box display="flex">
                <LocationOnIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {profile.location}
                </Typography>
              </Box>
              <Box display="flex" marginLeft="1rem">
                <InsertLinkIcon htmlColor="#555" />
                <Link
                  sx={{ textDecoration: "none", marginLeft: "6px" }}
                  href={profile.website || "https:/wasifbaliyan.com"}
                >
                  {profile.website ? profile.website : "www"}
                </Link>
              </Box>
              <Box display="flex" marginLeft="1rem">
                <DateRangeIcon htmlColor="#555" />
                <Typography sx={{ ml: "6px", color: "#555" }}>
                  {profile.userId &&
                    profile.userId &&
                    profile.userId.createdAt &&
                    format(new Date(profile.userId.createdAt), "MMM dd yyyy")}
                </Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black" }}>
                  {/* {followingStatus === "success" && followings.length} */}
                </strong>
                Following
              </Typography>
              <Typography color="#555" marginRight="1rem">
                <strong style={{ color: "black" }}>
                  {/* {followerStatus === "success" && followers.length} */}
                </strong>
                Followers
              </Typography>
            </Box>
          </Box>
          <Box borderBottom="1px solid #ccc">
            <Typography
              display="inline-block"
              variant="caption"
              fontSize="16px"
              marginX="1rem"
              padding="6px 0"
              fontWeight="500"
              borderBottom={`4px solid ${theme.palette.primary.main}`}
            >
              Posts
            </Typography>
          </Box>
          {profile.posts &&
            profile.posts.map((post) => (
              <Post key={post._id} post={post} profile={true} />
            ))}
        </Box>
      )}
    </Box>
    </div>
  )
}

export default Research
