import { Button, Grid, Input } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../api";
import { getPosts } from "../redux/postSlice";

import { LHC, LG, LGsvg } from "../images";

export default function AddPost() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [postText, setPostText] = useState("");
  const handleAddPost = async () => {
    const data = await addPost({ text: postText });
    if (data) {
      dispatch(getPosts());
      setPostText("");
    }
  };
  return (
    <Box padding="1rem 1rem 0 1rem" borderBottom="1px solid #ccc">
      <Grid container>
        <Grid item sx={{ paddingRight: "1rem" }}>
          <img src={LGsvg} alt="logo" width="50px" />
        </Grid>
        <Grid item flexGrow="1">
          <Box padding=".5rem 0">
            <Input
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              multiline
              rows="2"
              disableUnderline
              type="text"
              placeholder="What's happening?"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box
            textAlign="right"
            paddingBottom=".5rem"
            paddingTop=".5rem"
            borderTop="1px solid #ccc"
          >
            <IconButton
              onClick={handleAddPost}
              disabled={postText.trimStart().length === 0}
              variant="contained"
              // endIcon={<SendIcon />}
              sx={{
                // borderRadius: theme.shape.borderRadius,
                fontSize: "12px",
                backgroundColor: "#2bc0d0",
              }}
            >
              <SendIcon />
            </IconButton>
            <IconButton
              aria-label="upload picture"
              component="label"
              onClick={handleAddPost}
              sx={{
                fontSize: "12px",
                backgroundColor: "#2bc0d0",
              }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
